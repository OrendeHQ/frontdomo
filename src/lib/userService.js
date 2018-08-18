import { BASE_URL } from 'constants/misc';
import serviceTemplate from 'lib/serviceTemplate';

const SERVICE_URL = BASE_URL + '/user';

export const login = async ({ username, password }) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
  );

export const getAllUsers = async ({ token }) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );

export const createNewUser = async (user, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(user),
    }),
  );

export const editUser = async (user, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(user),
    }),
  );

export const deleteUser = async ({ id }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    }),
  );

export const changePassword = async ({ oldPassword, password }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/change_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ old_password: oldPassword, password }),
    }),
  );
