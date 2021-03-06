import { storedToken } from 'lib/misc';

export const BASE_URL = process.env.API_URL;
export const WS_URL = process.env.WS_URL;
export const MAP_API_URL = process.env.MAP_API_URL;
export const NONE = 'NONE';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const defaultState = {
  token: {
    status: storedToken ? SUCCESS : NONE,
    value: storedToken ? storedToken.value : '',
    error: '',
    isAdmin: storedToken ? storedToken.isAdmin : false,
  },
  company: {
    status: NONE,
    value: [],
    error: '',
  },
  user: {
    status: NONE,
    value: [],
    error: '',
  },
  robot: {
    status: NONE,
    value: [],
    error: '',
  },
  parcel: {
    status: NONE,
    value: [],
    error: '',
  },
};
