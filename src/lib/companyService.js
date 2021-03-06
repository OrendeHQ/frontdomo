import { BASE_URL } from 'constants/misc';
import serviceTemplate from 'lib/serviceTemplate';

const SERVICE_URL = BASE_URL + '/company';

export const getAllCompanies = async ({ token }) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );

export const createNewCompany = async (company, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    }),
  );

export const editCompany = async (company, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'PUT',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    }),
  );

export const deleteCompany = async ({ id }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'DELETE',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }),
  );
