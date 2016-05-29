import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Header from '../components/Header';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(title) {
    this.setState({title: title});
  }

  render () {

    const { dispatch, isAuthenticated, employee } = this.props;

    return (
      <div className="height100">
        <Header isAuthenticated={isAuthenticated} dispatch={dispatch} employee={employee} title={this.state.title}/>
        {React.cloneElement(this.props.children, {updateTitle: this.updateTitle})}
      </div>
    );
  }
}

export default connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated,
   employee: state.auth.employee
  };
})(App);