import {
  PARCEL_FAIL,
  PARCEL_LOADING,
  PARCEL_ADD,
  PARCEL_DELETE,
  PARCEL_EDIT,
  PARCEL_SUCCESS,
  PARCEL_TOGGLE_EDIT,
} from 'constants/actionTypes';

import { tokenClear } from './token';
import { withAuth } from 'lib/misc';
import {
  getAllParcels,
  createNewParcel,
  editParcel,
  deleteParcel,
} from 'lib/parcelService';

const parcelLoading = () => ({ type: PARCEL_LOADING });
const parcelSuccess = payload => ({ type: PARCEL_SUCCESS, payload });
const parcelFail = payload => ({ type: PARCEL_FAIL, payload });
const parcelAdd = payload => ({ type: PARCEL_ADD, payload });
const parcelEdit = payload => ({ type: PARCEL_EDIT, payload });
const parcelDelete = payload => ({ type: PARCEL_DELETE, payload });

export const fetchAllParcels = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(parcelLoading());

  try {
    const { parcels } = await withAuth(
      getAllParcels(token.value),
      dispatchFunc,
    );
    dispatchEvent(parcelSuccess(parcels));
  } catch (e) {
    dispatchEvent(parcelFail(e));
  }
};

export const toggleParcelEdit = index => ({
  type: PARCEL_TOGGLE_EDIT,
  payload: { index },
});

export const addNewParcel = pc => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(parcelLoading());
  try {
    const { parcel } = await withAuth(
      createNewParcel(pc, token.value),
      dispatchFunc,
    );
    dispatchEvent(parcelAdd(parcel));
  } catch (e) {
    dispatchEvent(parcelFail(e));
  }
};

export const editExistingParcel = pc => async (dispatchEvent, getState) => {
  const { token, parcel } = getState();
  const index = parcel.value.findIndex(v => v._id === pc.id);
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(parcelLoading());
  try {
    const res = await withAuth(editParcel(pc, token.value), dispatchFunc);
    dispatchEvent(parcelEdit({ parcel: res, index }));
  } catch (e) {
    dispatchEvent(toggleParcelEdit(index));
    dispatchEvent(parcelFail(e));
  }
};

export const removeParcel = ({ id }) => async (dispatchEvent, getState) => {
  const { token, parcel } = getState();
  const index = parcel.value.findIndex(v => v._id === id);
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(parcelLoading());
  try {
    await withAuth(deleteParcel({ id }, token.value), dispatchFunc);
    dispatchEvent(parcelDelete({ index }));
  } catch (e) {
    dispatchEvent(parcelFail(e));
  }
};
