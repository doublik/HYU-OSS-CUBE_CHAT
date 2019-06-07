import React from "react";
import axios from 'axios';
import io from "socket.io-client";

import Messages from './Messages';
import Users from './Users';
import './css/Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cool: false,
      user_id: this.props.userID,
      content: '',
      msg: [],
      user_list: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.socket = io({query: {user_id: this.state.user_id}});

    this.socket.on('NEW_USER', function(data) {
      addUser(data);
    })

    this.socket.on('OUT_USER', function(data) {
      addMessage({"alert": true, "newUser": false, user_id: data.user_id})
      updateUser(data.user_list);
    });

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addUser = data => {
      if(this.state.user_list.indexOf(data.user_id) === -1) {
        addMessage({"alert": true, "newUser": true, user_id: data.user_id});
        updateUser(data.user_list);
      }
    }

    const updateUser = data => {
      this.setState({user_list: data});
      console.log(data);
    }

    const addMessage = data => {
      const newMsg = this.state.msg;
      if(data.alert) {
        newMsg.push({
          "alert": data.alert,
          "newUser": data.newUser,
          "user_id": data.user_id
        })
      } else {
        newMsg.push({
          "alert": data.alert,
          "newUser": data.newUser,
          "user_id": data.user_id,
          "content": data.content,
          "time": data.time
        })
      }
      this.setState({msg: newMsg});
    };

    this.sendMessage = (e) => {
      e.preventDefault();
      if(this.state.content.trim() !== '' && !this.state.wait) {
        this.socket.emit('SEND_MESSAGE', {
          user_id: this.state.user_id,
          content: this.state.content.trim()
        });
      }
      this.setState({content: ''});
    };
  }

  componentDidMount() {
    axios
    .get('/msg')
    .then(res => {
      this.setState({msg: res.data});
    })
  }

  handleChange(e) {
    this.setState({content: e.target.value});
  }

  handleKeyDown(e) {
    if(e.key === 'Enter' && !this.state.cool && this.state.content.trim() !== '') {
      this.setState({cool: true});
      this.socket.emit('SEND_MESSAGE', {
        user_id: this.state.user_id,
        content: this.state.content.trim()
      });
      this.setState({content: ''});
    } else if(this.state.cool) {
      this.setState({content: '', cool: false});
    }
  }
  
  render() {
    function refreshPage() {
      window.location.reload();
    }

    return (
      <div className="room-container">
        <div className="room-header">
          <div>CUBE CHAT</div>
          <div className="exit" onClick={ refreshPage }>EXIT</div>
        </div>
        <div className="room-body">
          <div className="chat-container">
            <Messages msg={this.state.msg} user_id={this.state.user_id} />
            <div className="chat-footer">
              <input type="text" placeholder="Cube Chat에 메세지 보내기." value={this.state.content} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
              <button onClick={this.sendMessage} className="btn btn-primary">Send</button>
            </div>
          </div>
          <div className="user-container">
            <div className="user-count">온라인 - {this.state.user_list.length}</div>
            <Users userList={this.state.user_list} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;