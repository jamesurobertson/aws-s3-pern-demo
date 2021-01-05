import { fetch } from "../util/csrf.js";

const GET_USERS = "users/get_users";

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");
  dispatch(getUsers(res.data));
};

const initialState = {};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_USERS:
      const allUsers = {};
      action.payload.forEach((user) => {
        allUsers[user.id] = user;
      });
      return allUsers;
    default:
      return state;
  }
}

export default reducer;
