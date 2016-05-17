import {createReducer} from '../utils';
import C from '../constants';

const initialState = {
  data: null,
  isFetching: false
};

export default createReducer(initialState, {
  [C.RECEIVE_PROTECTED_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      'data': payload.data,
      'isFetching': false
    });
  },
  [C.FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': true
    });
  }
});