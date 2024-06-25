export const fetchUsers = (response) => {
  return {
    type: "FETCH_USERS",
    payload: response,
  };
};

export const fetchUser = (response) => {
  let user = {
    name: response[0][1],
    license: response[0][2],
    email: response[0][3],
    phone: response[0][4],
  };
  return {
    type: "FETCH_USER",
    payload: user,
  };
};

export const fetchHistory = (response) => {
  return {
    type: "FETCH_HISTORY",
    payload: response,
  };
};

export const deleteUser = (response) => {
  return {
    type: "DELETE_USER",
    payload: response,
  };
};

export const insertUser = (response) => {
  return {
    type: "INSERT_USER",
    payload: response,
  };
};
