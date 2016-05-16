import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';

export default combineReducers({
 auth,
 data,
 routing: routerReducer
});