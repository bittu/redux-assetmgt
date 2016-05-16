import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import { loginUserSuccess } from './actions';

const target = document.getElementById('app');
const { store, history } = configureStore(hashHistory, window.__INITIAL_STATE__);

const node = (
	<Root store={store} history={history} />
	);

let token = localstorage.getItem('token');

if(token !== null) {
	store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(node, target);