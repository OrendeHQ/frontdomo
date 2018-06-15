import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import company from './company';

export default combineReducers({ routerReducer, token, company });
