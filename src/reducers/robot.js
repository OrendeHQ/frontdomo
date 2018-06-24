import {
  ROBOT_FAIL,
  ROBOT_LOADING,
  ROBOT_SUCCESS,
  ROBOT_TOGGLE_EDIT,
  ROBOT_ADD,
  ROBOT_EDIT,
  ROBOT_DELETE,
} from 'constants/actionTypes';
import { LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function robot(state = {}, { type, payload }) {
  switch (type) {
    case ROBOT_LOADING:
      return Object.assign({}, state, { status: LOADING });
    case ROBOT_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: payload.map(v => Object.assign(v, { editing: false })),
      });
    case ROBOT_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: payload.message,
      });
    case ROBOT_TOGGLE_EDIT:
      return Object.assign({}, state, {
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], {
            editing: !state.value[payload.index].editing,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case ROBOT_ADD:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [...state.value, payload],
      });
    case ROBOT_EDIT:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], payload.robot, {
            editing: false,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case ROBOT_DELETE:
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
