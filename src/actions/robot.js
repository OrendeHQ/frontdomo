import {
  // ROBOT_ADD,
  // ROBOT_DELETE,
  // ROBOT_EDIT,
  ROBOT_FAIL,
  ROBOT_LOADING,
  ROBOT_SUCCESS,
  ROBOT_TOGGLE_EDIT,
} from 'constants/actionTypes';
import { getAllRobots } from 'lib/robotService';
import { tokenClear } from './token';
import { withAuth } from 'lib/misc';

const robotLoading = () => ({ type: ROBOT_LOADING });
const robotSuccess = payload => ({ type: ROBOT_SUCCESS, payload });
const robotFail = payload => ({ type: ROBOT_FAIL, payload });
// const robotAdd = payload => ({ type: ROBOT_ADD, payload });
// const robotEdit = payload => ({ type: ROBOT_EDIT, payload });
// const robotDelete = payload => ({ type: ROBOT_DELETE, payload });

export const toggleRobotEdit = index => ({
  type: ROBOT_TOGGLE_EDIT,
  payload: { index },
});

export const fetchAllRobots = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear);
  dispatchEvent(robotLoading());
  try {
    const { robots } = await withAuth(getAllRobots(token.value), dispatchFunc);
    dispatchEvent(robotSuccess(robots));
  } catch (e) {
    dispatchEvent(robotFail(e));
  }
};
