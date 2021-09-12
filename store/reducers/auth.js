import { AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";
import { updateObject } from "../../util/updateObject";
const initState = {
  token: null,
  userId: null,
  expirationDate: null,
  user: null,
};

const authReducer = (
  state = initState,
  { type, token, userId, expirationDate, user }
) => {
  switch (type) {
    case AUTH_SUCCESS:
      return updateObject(state, {
        token,
        userId,
        expirationDate,
        user,
      });
    case AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
        expirationDate: null,
        user: null,
      });
    default:
      return state;
  }
};

export default authReducer;
