import React from 'react';

class Users extends React.Component {
  render() {
    const users = this.props.userList.map((name, i) => {
      return (
        <div key={i} className="user-info">
          <div className="user-icon">
            <div className="user-img"></div>
            <div className="user-online"></div>
          </div>
          <div className="user-name">{name}</div>
        </div>
      )
    })
    return (
      <div className='user-lists' id='userList'>
        { users }
      </div>
    );
  }
}

export default Users;