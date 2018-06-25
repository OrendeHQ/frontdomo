import { BASE_URL } from 'constants/misc';
import serviceTemplate, { fileReq } from 'lib/serviceTemplate';

const SERVICE_URL = BASE_URL + '/parcel';

export const getAllParcels = async token =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );

export const createNewParcel = async (parcel, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(parcel),
    }),
  );

export const editParcel = async (parcel, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(parcel),
    }),
  );

export const deleteParcel = async ({ id }, token) =>
  await serviceTemplate(
    fetch(`${SERVICE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    }),
  );

export const getParcelBarcode = async ({ id }, token) =>
  await fileReq(
    fetch(`${SERVICE_URL}/barcode/${id}`, {
      method: 'GET',
      headers: { Authorization: token },
    }),
  );
