import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import company from './company';
import user from './user';

export default combineReducers({ routerReducer, token, company, user });
