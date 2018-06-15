import {
  COMPANY_FAIL,
  COMPANY_LOADING,
  COMPANY_SUCCESS,
  COMPANY_TOGGLE_EDIT,
  COMPANY_ADD,
} from 'constants/actionTypes';
import { getAllCompanies, createNewCompany } from 'lib/companyService';
import { tokenClear } from './token';
import { withAuth } from 'lib/misc';

const companyLoading = () => ({ type: COMPANY_LOADING });
const companySuccess = payload => ({ type: COMPANY_SUCCESS, payload });
const companyFail = payload => ({ type: COMPANY_FAIL, payload });
const companyAdd = payload => ({ type: COMPANY_ADD, payload });

export const fetchAllCompanies = () => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear);
  dispatchEvent(companyLoading());
  try {
    const { companies } = await withAuth(
      getAllCompanies({ token: token.value }),
      dispatchFunc,
    );
    dispatchEvent(companySuccess(companies));
  } catch (e) {
    dispatchEvent(companyFail(e));
  }
};

export const toggleCompanyEdit = index => ({
  type: COMPANY_TOGGLE_EDIT,
  payload: { index },
});

export const addNewCompany = company => async (dispatchEvent, getState) => {
  const { token } = getState();
  const dispatchFunc = dispatchEvent.bind(null, tokenClear);
  dispatchEvent(companyLoading());
  try {
    const res = await withAuth(
      createNewCompany(company, token.value),
      dispatchFunc,
    );
    dispatchEvent(companyAdd(res.company));
  } catch (e) {
    dispatchEvent(companyFail(e));
  }
};
