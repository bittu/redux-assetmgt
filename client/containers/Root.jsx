import React from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';

export default class Root extends React.Component {
	static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        <Provider store={this.props.store}>
          <Router history={this.props.history}>
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}