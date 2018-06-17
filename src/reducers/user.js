import {
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
  USER_TOGGLE_EDIT,
  USER_ADD,
  USER_EDIT,
  USER_DELETE,
} from 'constants/actionTypes';
import { LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function user(state = {}, { type, payload }) {
  switch (type) {
    case USER_LOADING:
      return Object.assign({}, state, { status: LOADING });
    case USER_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: payload.map(v => Object.assign(v, { editing: false })),
      });
    case USER_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: payload.message,
      });
    case USER_TOGGLE_EDIT:
      return Object.assign({}, state, {
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], {
            editing: !state.value[payload.index].editing,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case USER_ADD:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [...state.value, payload],
      });
    case USER_EDIT:
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
    case USER_DELETE:
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
