export default async fetchReq => {
  try {
    const res = await fetchReq;
    const val = await res.json();
    if (res.status === 200 || res.status === 201) {
      return val;
    } else {
      throw Object.assign({}, val, { status: res.status });
    }
  } catch (e) {
    if (e.status) throw e;
    throw { status: 599, message: JSON.stringify(e) };
  }
};
