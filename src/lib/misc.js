export const storedToken = (() => {
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const isTokenValid = !!(
    storedToken &&
    storedToken.value &&
    storedToken.hasOwnProperty('isAdmin')
  );

  return isTokenValid ? storedToken : null;
})();
