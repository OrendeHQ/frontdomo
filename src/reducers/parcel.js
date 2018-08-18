import {
  PARCEL_FAIL,
  PARCEL_LOADING,
  PARCEL_SUCCESS,
  PARCEL_TOGGLE_EDIT,
  PARCEL_ADD,
  PARCEL_EDIT,
  PARCEL_DELETE,
} from 'constants/actionTypes';
import { LOADING, SUCCESS, ERROR } from 'constants/misc';

export default function user(state = {}, { type, payload }) {
  switch (type) {
    case PARCEL_LOADING:
      return Object.assign({}, state, { status: LOADING });
    case PARCEL_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: payload.map(v => Object.assign(v, { editing: false })),
      });
    case PARCEL_FAIL:
      return Object.assign({}, state, {
        status: ERROR,
        error: payload.message,
      });
    case PARCEL_TOGGLE_EDIT:
      return Object.assign({}, state, {
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], {
            editing: !state.value[payload.index].editing,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case PARCEL_ADD:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [...state.value, payload],
      });
    case PARCEL_EDIT:
      return Object.assign({}, state, {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, payload.index),
          Object.assign({}, state.value[payload.index], payload.parcel, {
            editing: false,
          }),
          ...state.value.slice(payload.index + 1),
        ],
      });
    case PARCEL_DELETE:
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
