import {
  COMPANY_FAIL,
  COMPANY_LOADING,
  COMPANY_SUCCESS,
} from 'constants/actionTypes';
import { getAllCompanies } from 'lib/companyService';

const companyLoading = () => ({ type: COMPANY_LOADING });
const companySuccess = payload => ({ type: COMPANY_SUCCESS, payload });
const companyFail = payload => ({ type: COMPANY_FAIL, payload });

export const fetchAllCompanies = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  dispatchEvent(companyLoading());
  try {
    const { companies } = await getAllCompanies({ token: token.value });
    dispatchEvent(companySuccess(companies));
  } catch (e) {
    dispatchEvent(companyFail(e));
  }
};
