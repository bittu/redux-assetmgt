import {createReducer} from '../utils';
import C from '../constants';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [C.LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
  },
  [C.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'userName': jwtDecode(payload.token).userName,
      'isAdmin': jwtDecode(payload.token).isAdmin,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [C.LOGIN_USER_FAILURE]: (state, payload) => {
    console.log(payload)
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'isAdmin': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [C.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'isAdmin': null,
      'statusText': 'You have been successfully logged out.'
    });
  }
});