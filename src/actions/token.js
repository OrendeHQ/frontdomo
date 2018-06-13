import {
  TOKEN_CLEAR,
  TOKEN_LOGGING_IN,
  TOKEN_LOGIN_FAIL,
  TOKEN_LOGIN_SUCCESS,
} from 'constants/actionTypes';
import { login } from 'lib/userService';

const tokenLoggingin = () => ({ type: TOKEN_LOGGING_IN });
const tokenLoginSuccess = payload => ({ type: TOKEN_LOGIN_SUCCESS, payload });
const tokenLoginFail = payload => ({ type: TOKEN_LOGIN_FAIL, payload });
export const tokenClear = () => ({ type: TOKEN_CLEAR });

export const tokenLogin = ({ username, password }) => async dispatchEvent => {
  dispatchEvent(tokenLoggingin());
  try {
    const res = await login({ username, password });
    dispatchEvent(tokenLoginSuccess(res));
  } catch (e) {
    dispatchEvent(tokenLoginFail(e));
  }
};
