import React from 'react';
import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = []
    const pMsg = this.props.msg;
    for (var i = 0; i < pMsg.length; i++) {
      console.log(pMsg[i]);
      messages.push(<Message key={i} data={pMsg[i]}
        sep={(i===0 || pMsg[i-1].alert || pMsg[i].user_id !== pMsg[i-1].user_id) ? true:false}
        vtime={!pMsg[i].alert && (i===pMsg.length-1 || pMsg[i].time !== pMsg[i+1].time || pMsg[i].user_id !== pMsg[i+1].user_id) ? true:false} />);
    }

    return (
      <div className='chat-body' id='messageList'>
        { messages }
      </div>
    );
  }
}

export default Messages;