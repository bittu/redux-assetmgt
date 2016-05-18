import { checkHttpStatus, parseJSON } from '../utils';
import C from '../constants';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: C.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  console.log(error);
  return {
    type: C.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
      response: error
    }
  }
}

export function loginUserRequest() {
  return {
    type: C.LOGIN_USER_REQUEST
  }
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: C.LOGOUT_USER
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  }
}

export function loginUser(EmployeeID, Password, redirect="/") {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch('/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({payload: {EmployeeID: EmployeeID, Password: Password}})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          let decoded = jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token));
          dispatch(push(redirect));
        } catch (e) {
          dispatch(loginUserFailure({
              response: {
                  status: 403,
                  statusText: 'Invalid token'
              }
          }));
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      })
  }
}

export function receiveProtectedData(data) {
  return {
    type: C.RECEIVE_PROTECTED_DATA,
    payload: {
      data: data
    }
  }
}

export function fetchProtectedDataRequest() {
  return {
    type: C.FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest());
    return fetch('/getData/', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveProtectedData(response.data));
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(loginUserFailure(error));
          dispatch(push('/login'));
        }
      })
  }
}