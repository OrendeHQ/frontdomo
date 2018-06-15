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
