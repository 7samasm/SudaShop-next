const { createContext, useReducer, useContext } = require("react");
import { getSession, signIn, signout } from "next-auth/client";
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
    await signout({ redirect: false });
    clearTimeout(timer);
    authDispatch({ type: "AUTH_LOGOUT" });
  }

  async function refreshToken() {
    try {
      const result = await signIn("credentials", {
        redirect: false,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      const { accessToken, user } = await getSession();
      console.log("{{{rt}}}", user);
      authSuccess(accessToken, user.userId, user);
      startRefreshTokenTimer(accessToken);
    } catch (error) {
      console.log(error);
      // logout();
    }
  }

  function startRefreshTokenTimer(token) {
    const expiredJWT = JSON.parse(atob(token.split(".")[1]));
    console.log(expiredJWT);
    const expire = new Date(expiredJWT.exp * 1000);
    console.log(expire);
    const timeout = expire.getTime() - new Date().getTime() - 10000;
    timer = setTimeout(() => {
      refreshToken();
    }, timeout);
    return timer;
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
