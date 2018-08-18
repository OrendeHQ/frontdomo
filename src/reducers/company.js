import {
  COMPANY_FAIL,
  COMPANY_LOADING,
  COMPANY_SUCCESS,
  COMPANY_TOGGLE_EDIT,
  COMPANY_ADD,
  COMPANY_EDIT,
  COMPANY_DELETE,
} from 'constants/actionTypes';
import { LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function company(state = {}, { payload, type }) {
  switch (type) {
    case COMPANY_LOADING:
      return Object.assign({}, state, { status: LOADING });
    case COMPANY_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: payload.map(v => Object.assign(v, { editing: false })),
      });
    case COMPANY_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: payload.message,
      });
    case COMPANY_TOGGLE_EDIT:
      return Object.assign({}, state, {
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], {
            editing: !state.value[payload.index].editing,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case COMPANY_ADD:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [...state.value, payload],
      });
    case COMPANY_EDIT:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], payload.company, {
            editing: false,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case COMPANY_DELETE:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, payload.index),
          ...state.value.slice(payload.index + 1),
        ],
      });
    default:
      return state;
  }
}
