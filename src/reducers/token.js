import {
  TOKEN_CLEAR,
  TOKEN_LOGGING_IN,
  TOKEN_LOGIN_FAIL,
  TOKEN_LOGIN_SUCCESS,
} from 'constants/actionTypes';

import { NONE, LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function token(state = {}, action) {
  switch (action.type) {
    case TOKEN_LOGGING_IN:
      return Object.assign({}, state, { status: LOADING });
    case TOKEN_LOGIN_SUCCESS:
      localStorage.setItem(
        'token',
        JSON.stringify({
          value: action.payload.token,
          isAdmin: action.payload.is_admin,
        }),
      );
      return Object.assign({}, state, {
        status: SUCCESS,
        value: action.payload.token,
        isAdmin: action.payload.is_admin,
        error: '',
      });
    case TOKEN_LOGIN_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: action.payload.message,
        value: '',
      });
    case TOKEN_CLEAR:
      localStorage.removeItem('token');
      return Object.assign({}, state, {
        status: NONE,
        value: '',
        error: '',
        isAdmin: false,
      });
    default:
      return state;
  }
}
