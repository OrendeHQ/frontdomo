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
