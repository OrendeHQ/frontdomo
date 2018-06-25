import {
  ROBOT_ADD,
  ROBOT_DELETE,
  ROBOT_EDIT,
  ROBOT_FAIL,
  ROBOT_LOADING,
  ROBOT_SUCCESS,
  ROBOT_TOGGLE_EDIT,
  ROBOT_BATCH_DELETE,
} from 'constants/actionTypes';
import {
  getAllRobots,
  createNewRobot,
  editRobot,
  deleteRobot,
} from 'lib/robotService';
import { tokenClear } from './token';
import { withAuth } from 'lib/misc';
import { parcelBatchDelete } from './parcel';

const robotLoading = () => ({ type: ROBOT_LOADING });
const robotSuccess = payload => ({ type: ROBOT_SUCCESS, payload });
const robotFail = payload => ({ type: ROBOT_FAIL, payload });
const robotAdd = payload => ({ type: ROBOT_ADD, payload });
const robotEdit = payload => ({ type: ROBOT_EDIT, payload });
const robotDelete = payload => ({ type: ROBOT_DELETE, payload });

export const robotBatchDelete = payload => ({
  type: ROBOT_BATCH_DELETE,
  payload,
});

export const toggleRobotEdit = index => ({
  type: ROBOT_TOGGLE_EDIT,
  payload: { index },
});

export const fetchAllRobots = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(robotLoading());
  try {
    const { robots } = await withAuth(getAllRobots(token.value), dispatchFunc);
    dispatchEvent(robotSuccess(robots));
  } catch (e) {
    dispatchEvent(robotFail(e));
  }
};

export const addNewRobot = rb => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(robotLoading());
  try {
    const robot = await withAuth(createNewRobot(rb, token.value), dispatchFunc);
    dispatchEvent(robotAdd(robot));
  } catch (e) {
    dispatchEvent(robotFail(e));
  }
};

export const editExistingRobot = rb => async (dispatchEvent, getState) => {
  const { token, robot } = getState();
  const index = robot.value.findIndex(v => v._id === rb.id);
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(robotLoading());
  try {
    const res = await withAuth(editRobot(rb, token.value), dispatchFunc);
    dispatchEvent(robotEdit({ robot: res, index }));
  } catch (e) {
    dispatchEvent(robotFail(e));
    dispatchEvent(toggleRobotEdit(index));
  }
};

export const removeRobot = ({ id }) => async (dispatchEvent, getState) => {
  const { token, robot, parcel } = getState();
  const index = robot.value.findIndex(v => v._id === id);
  const parcelIndices = parcel.value.findIndex(v => v.robot_id === id);
  const dispatchFunc = dispatchEvent.bind(null, tokenClear());
  dispatchEvent(robotLoading());
  try {
    await withAuth(deleteRobot({ id }, token.value), dispatchFunc);
    dispatchEvent(robotDelete({ index }));
    dispatchEvent(parcelBatchDelete(parcelIndices));
  } catch (e) {
    dispatchEvent(robotFail(e));
  }
};
