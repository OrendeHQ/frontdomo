import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';

export default combineReducers({ routerReducer, token });
