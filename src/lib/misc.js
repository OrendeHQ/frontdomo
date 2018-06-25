export const storedToken = (() => {
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const isTokenValid = !!(
    storedToken &&
    storedToken.value &&
    storedToken.hasOwnProperty('isAdmin')
  );

  return isTokenValid ? storedToken : null;
})();

export async function withAuth(actionProm, dispatchFunc) {
  try {
    return await actionProm;
  } catch (e) {
    if (e.status === 401) return await dispatchFunc();
    throw e;
  }
}

export function getAllIndices(arr, filterFunc) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (filterFunc(arr[i])) {
      indices.push(i);
    }
  }

  return indices;
}
