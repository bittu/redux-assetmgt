import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { Card, Row, Col, Input, Button, Icon } from 'react-materialize';

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

  login(e) {
      e.preventDefault();
      if(!this.props.isAuthenticating) {
        this.props.actions.loginUser(this.state.EmployeeID, this.state.Password, this.state.redirectTo);
      }
  }

  employeeIDChange(e) {
    this.setState({EmployeeID: e.target.value.replace(/[^\d]/ig, '').substring(0, 7)});
  }

  passwordChange(e) {
    this.setState({Password: e.target.value});
  }

  render () {
    return (
      <Row>
        <Col s={4} offset='s4'>
          <Card title='Login' className='loginCard'>
            <form role="form" onSubmit={this.login.bind(this)}>
              <Row>
                <Input s={12} label="EmployeeID" value={this.state.EmployeeID} onChange={this.employeeIDChange.bind(this)}/>
                <Input type="password" label="Password" s={12} value={this.state.Password} onChange={this.passwordChange.bind(this)}/>
                <Button type="submit" disabled={this.props.isAuthenticating} waves='light'>Submit<Icon right>send</Icon></Button>
              </Row>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);