import { BASE_URL } from 'constants/misc';
import serviceTemplate from 'lib/serviceTemplate';

const SERVICE_URL = BASE_URL + '/robot';

export const getAllRobots = async token =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );

export const createNewRobot = async (robot, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(robot),
    }),
  );

export const editRobot = async (robot, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(robot),
    }),
  );

export const deleteRobot = async ({ id }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    }),
  );

export const getRobotToken = async ({ robotID, authToken }) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/token/${robotID}`, {
      method: 'GET',
      headers: { Authorization: authToken },
    }),
  );

export const getOnlineRobots = async token =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/online`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );

export const getRobotLocation = async ({ robotID }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/gps/${robotID}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );
