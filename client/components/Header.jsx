import React from 'react';
import {logoutAndRedirect} from '../actions';

export default class Header extends React.Component {

	render() {

		let header = null;

		if(this.props.isAuthenticated) {        
			header = (<div className="navbar-fixed">
					        <nav>
					          <div className="nav-wrapper blue darken-1">
					            <a className="brand-logo">Asset Management || User Dashboard</a>
					              <ul className="right">
					                <li>{this.props.employee.EmployeeID}</li>
					                <li><a href='#' onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a></li>
					              </ul>
					          </div>
					        </nav>
					      </div>)
		}
		return (header);
	}
}