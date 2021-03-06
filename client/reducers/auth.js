import {createReducer} from '../utils';
import C from '../constants';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  employee: null,
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
      'employee': jwtDecode(payload.token).employee,
      'isAdmin': jwtDecode(payload.token).Admin,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [C.LOGIN_USER_FAILURE]: (state, payload) => {
    console.log(payload)
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'employee': null,
      'isAdmin': null,
      'statusText': `${payload.status === 401 ? 'Invalid Credentials' : '(' + payload.status + ') ' + payload.statusText}`
    });
  },
  [C.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'employee': null,
      'isAdmin': null,
      'statusText': null
    });
  }
});