import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { push } from 'react-router-redux'

export class LoginView extends React.Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.redirect || '/login';
    this.state = {
      EmployeeID: '',
      Password: '',
      redirectTo: redirectRoute
    };
  }

  componentWillMount() {
    if(this.props.isAuthenticated) {
      this.props.actions.alreadyLoginRedirect();
    }
  }

  login(e) {
      e.preventDefault();
      if(!this.state.EmployeeID || !this.state.Password) {

      }
      if(!this.props.isAuthenticating) {
        this.props.actions.loginUser(this.state.EmployeeID, this.state.Password, this.state.redirectTo);
      }
  }

  employeeIDChange(e) {
    this.setState({EmployeeID: e.target.value.replace(/[^\d]/ig, '')});
  }

  passwordChange(e) {
    this.setState({Password: e.target.value});
  }

  render () {
    return (
      <div className="row valign-wrapper login-wrapper height100">
        <div className="col s4 offset-s4 valign">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Login</span>
              <form role="form" onSubmit={this.login.bind(this)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="EmployeeID" type="text" className="validate"
                      value={this.state.EmployeeID}
                      onChange={this.employeeIDChange.bind(this)}
                      maxLength="7" required
                    />
                    <label for="EmployeeID">EmployeeID</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="Password" type="password" className="validate"
                      value={this.state.Password}
                      onChange={this.passwordChange.bind(this)} required
                    />
                    <label for="Password">Password</label>
                  </div>
                  <div className="col s4">
                    <button 
                      className={"btn blue waves-effect waves-light" + (this.props.isAuthenticating ? " disabled": "")}
                      type="submit" name="action"
                      disabled={this.props.isAuthenticating}
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                  <div className="col s8">
                    <div className={"card-panel red form-error" + (this.props.statusText ? ' shake' : " hide")}>
                      <span className="white-text">{this.props.statusText}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  isAuthenticated    : state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);