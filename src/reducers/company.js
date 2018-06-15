import {
  COMPANY_FAIL,
  COMPANY_LOADING,
  COMPANY_SUCCESS,
} from 'constants/actionTypes';
import { LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function company(state = {}, { payload, type }) {
  switch (type) {
    case COMPANY_LOADING:
      return Object.assign({}, state, { status: LOADING });
    case COMPANY_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: payload,
      });
    case COMPANY_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: payload.message,
      });
    default:
      return state;
  }
}
