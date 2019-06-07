import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import LoginPanel from './components/LoginPanel';
import Chat from './components/Chat';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: ''
    }
  }

  onLogin(ID) {
    this.setState({userID: ID});
  }
  
  onLogout() {
    this.setState({userID: ''});
  }

  render() {
    if(!this.state.userID) {
      return <LoginPanel onSuccess={ this.onLogin.bind(this) } />;
    }
    return (
      <BrowserRouter>
        <div className="space-container">
          <div className="aside-container">

          </div>
          <Chat userID={ this.state.userID } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;