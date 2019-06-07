import React, { Component } from 'react'
import axios from 'axios';
import './css/LoginPanel.css';

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visSignIn: true,
      reqID: '',
      reqPW: '',
      reqRePW: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.viewSignIn = this.viewSignIn.bind(this)
    this.viewSignUp = this.viewSignUp.bind(this)
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSignIn(e) {
      e.preventDefault()

      axios
      .post('/user/login', {
        userID: this.state.reqID,
        userPW: this.state.reqPW
      })
      .then(res => {
        if(res.data === this.state.reqID) {
          this.props.onSuccess(res.data);
        } else {
          this.setState({reqID: '', reqPW: ''});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSignUp(e) {
      e.preventDefault()

      axios
      .post('/user/regist', {
        userID: this.state.reqID,
        userPW: this.state.reqPW,
        userRePW: this.state.reqRePW
      })
      .then(res => {
        console.log(res);
        if(res.data === 'success') {
          this.viewSignIn();
        } else {
          this.setState({reqID: '', reqPW: '', reqRePW: ''});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  viewSignIn() {
    this.setState({visSignIn: true, reqID: '', reqPW: ''})
  }

  viewSignUp() {
    this.setState({visSignIn: false, reqID: '', reqPW: '', reqRePW: ''})
  }

  render() {
    const SIGNIN = (
      <div className="div-back">
        <div className="div-title">Welcome to CUBE CHAT!</div>
        <form onSubmit={ this.onSignIn }>
        <div className="input-field">
          <div className="div-text">ID</div>
            <input className="input-color" type="text" name="reqID" value={ this.state.reqID } onChange={ this.onChange } autoComplete="off" required autoFocus/>
          </div>
          <div className="input-field">
            <div className="div-text">PASSWORD</div>
            <input className="input-color" type="password" name="reqPW" value={ this.state.reqPW } onChange={ this.onChange } required/>
          </div>
          <button className="button-color" type="submit">Login</button>
          <div className="div-change" onClick={this.viewSignUp}>Create your account</div>
        </form>
      </div>
    )

    const SIGNUP = (
      <div className="div-back">
        <div className="div-title">Create an account</div>
        <form onSubmit={ this.onSignUp }>
          <div className="input-field">
            <div className="div-text">ID</div>
            <input className="input-color" type="text" name="reqID" value={ this.state.reqID } onChange={ this.onChange } autoComplete="off" required autoFocus/>
          </div>
          <div className="input-field">
            <div className="div-text">PASSWORD</div>
            <input className="input-color" type="password" name="reqPW" value={ this.state.reqPW } onChange={ this.onChange } required/>
          </div>
          <div className="input-field">
            <div className="div-text">REPEAT PASSWORD</div>
            <input className="input-color" type="password" name="reqRePW" value={ this.state.reqRePW } onChange={ this.onChange } required/>
          </div>
          <button className="button-color" type="submit">Continue</button>
          <div className="div-change" onClick={this.viewSignIn}>Already have an account?</div>
        </form>
      </div>
    )

    return (
      <div className="sign-container">
        { this.state.visSignIn ? SIGNIN : SIGNUP }
      </div>
    )
  }
}

export default LoginPanel;