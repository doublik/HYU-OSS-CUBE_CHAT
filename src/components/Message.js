import React from 'react';

class Message extends React.Component {
  render() {
    const enter = (
      <div>{this.props.data.user_id} 님이 입장하였습니다.</div>
    )
    const out = (
      <div>{this.props.data.user_id} 님이 퇴장하였습니다.</div>
    )
    if(this.props.data.alert === true) {
      return (
        <div className="message-alert">
          {this.props.data.newUser ? enter : out}
        </div>
      )
    } else if(this.props.sep) {
      return (
        <div className="message">
          <div className="message-from">
            <div className="message-usericon"></div>
            <div className="message-username">{this.props.data.user_id}</div>
          </div>
          <div className="message-body">
            <div className="message-content">{this.props.data.content}</div>
            <div className="message-date">{this.props.vtime?this.props.data.time:''}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="message">
          <div className="message-body">
            <div className="message-content">{this.props.data.content}</div>
            <div className="message-date">{this.props.vtime?this.props.data.time:''}</div>
          </div>
        </div>
      )
    }
  }
}

export default Message;