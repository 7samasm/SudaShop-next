const { createContext, useReducer, useContext } = require("react");
import { signout } from "next-auth/client";
import { updateObject } from "../util/updateObject";
import { onRefreshToken, onStartRefreshToken } from "./util/authCtx.util";

const initState = {
  token: null,
  userId: null,
  user: null,
};

const authReducer = (state, { type, token, userId, user }) => {
  switch (type) {
    case "AUTH_SUCCESS":
      return updateObject(state, {
        token,
        userId,
        user,
      });
    case "AUTH_LOGOUT":
      return updateObject(state, {
        token: null,
        userId: null,
        user: null,
      });
    default:
      throw new Error("why you here :(");
  }
};

var timer;

const authCtx = createContext({
  ...initState,
  isLoggedIn: false,
  authSuccess: function () {},
  refreshToken: async function () {},
  startRefreshTokenTimer: function (token) {},
  logout: function () {},
});

export const useAuthContext = () => useContext(authCtx);

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initState);

  function authSuccess(token, userId, user) {
    authDispatch({
      type: "AUTH_SUCCESS",
      token,
      userId,
      user,
    });
  }

  async function logout() {
    clearTimeout(timer);
    authDispatch({ type: "AUTH_LOGOUT" });
  }

  async function refreshToken() {
    await onRefreshToken(authSuccess, startRefreshTokenTimer);
  }

  function startRefreshTokenTimer(token) {
    return onStartRefreshToken(token, refreshToken, timer);
  }
  const ctx = {
    ...authState,
    isLoggedIn: authState.token !== null,
    authSuccess,
    refreshToken,
    startRefreshTokenTimer,
    logout,
  };
  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;
