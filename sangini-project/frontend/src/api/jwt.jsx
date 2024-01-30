// jwt.js
const setAuthToken = (token) => {
  if (token===null || token===undefined){
    removeAuthToken();
  } else {
    localStorage.setItem("authorization", token);
  }
};

const getAuthToken = () => {
  return localStorage.getItem("authorization");
};

const removeAuthToken = () => {
  localStorage.removeItem("authorization");
};

export { setAuthToken, getAuthToken, removeAuthToken };