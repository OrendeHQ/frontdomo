import {
  USER_FAIL,
  USER_LOADING,
  // USER_ADD,
  // USER_DELETE,
  // USER_EDIT,
  USER_SUCCESS,
  USER_TOGGLE_EDIT,
} from 'constants/actionTypes';
import { getAllUsers } from 'lib/userService';
import { tokenClear } from './token';
import { withAuth } from 'lib/misc';

const userLoading = () => ({ type: USER_LOADING });
const userSuccess = payload => ({ type: USER_SUCCESS, payload });
const userFail = payload => ({ type: USER_FAIL, payload });
// const userAdd = payload => ({ type: USER_ADD, payload });
// const userEdit = payload => ({ type: USER_EDIT, payload });
// const userDelete = payload => ({ type: USER_DELETE, payload });

export const fetchAllUsers = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear);
  dispatchEvent(userLoading());

  try {
    const { users } = await withAuth(
      getAllUsers({ token: token.value }),
      dispatchFunc,
    );
    dispatchEvent(userSuccess(users));
  } catch (e) {
    dispatchEvent(userFail(e));
  }
};

export const toggleUserEdit = index => ({
  type: USER_TOGGLE_EDIT,
  payload: { index },
});
