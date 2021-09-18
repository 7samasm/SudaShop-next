const { createContext, useReducer } = require("react");
import Axios from "../axios";
import { updateObject } from "../util/updateObject";

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

  function logout() {
    ["isLoggedIn", "user"].forEach((item) => {
      localStorage.removeItem(item);
    });
    clearTimeout(timer);
    authDispatch({ type: "AUTH_LOGOUT" });
  }

  async function refreshToken(refresh_token) {
    try {
      const {
        data: { token },
      } = await Axios().post(
        `/admin/refresh-token?refresh_token=${refresh_token}`
      );
      console.log(token);
      const {
        data: { user },
      } = await Axios(token).get("/admin/user");
      const { id } = JSON.parse(atob(token.split(".")[1]));
      authSuccess(token, id, user);
      startRefreshTokenTimer(token);
      return token;
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  function startRefreshTokenTimer(token, refresh_token) {
    const expiredJWT = JSON.parse(atob(token.split(".")[1]));
    console.log(expiredJWT);
    const expire = new Date(expiredJWT.exp * 1000);
    console.log(expire);
    const timeout = expire.getTime() - new Date().getTime() - 2000;
    timer = setTimeout(() => {
      refreshToken(refresh_token);
    }, timeout);
    // console.log(`%c ${timer}`, "font-size:18px;color:#4c3bd4");
    // console.log(`%c ${getState().auth}`, "font-size:18px;color:#4c3bd4");
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
