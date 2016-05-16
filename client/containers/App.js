import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../actions';

connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated
  };
})
export default class App extends React.Component {

  render () {

    const { dispatch } = this.props;

    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a className="brand-logo">g</a>
              {this.props.isAuthenticated
                ? (<ul className="right">
                    <li>{this.props.employee.EmployeeID}</li>
                    <li><a href='#' onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a></li>
                  </ul>)
                : ''
              }
            </div>
          </nav>
        </div>
        {this.props.children}
      </div>
    );
  }
}