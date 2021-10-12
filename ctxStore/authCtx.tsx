import { createContext, useReducer, useContext, FC } from "react";
import { updateObject } from "../util/updateObject";
import { onRefreshToken, onStartRefreshToken } from "./util/authCtx.util";

const initState = {
  token: null,
  userId: null,
  user: null,
};

interface IState {
  token: string | null;
  userId: string | null;
  user: { [k: string]: string } | null;
}

const authReducer = (
  state: IState,
  {
    type,
    token,
    userId,
    user,
  }: {
    type: string;
    token?: string;
    userId?: string;
    user?: { [k: string]: string };
  }
) => {
  switch (type) {
    case "AUTH_SUCCESS":
      return updateObject<IState>(state, {
        token: token!,
        userId: userId!,
        user: user!,
      });
    case "AUTH_LOGOUT":
      return updateObject<IState>(state, {
        token: null,
        userId: null,
        user: null,
      });
    default:
      throw new Error("why you here :(");
  }
};

var timer: NodeJS.Timeout;

const authCtx = createContext<{
  token: string | null;
  userId: string | null;
  user: { [key: string]: any } | null;
  isLoggedIn: boolean;
  authSuccess: (token: string, userId: string, user: any) => void;
  refreshToken: () => Promise<void>;
  startRefreshTokenTimer: (token: string) => NodeJS.Timeout;
  logout: () => void;
}>({
  ...initState,
  isLoggedIn: false,
  authSuccess() {},
  async refreshToken() {},
  startRefreshTokenTimer(token) {
    return setTimeout(() => {}, 2000);
  },
  logout() {},
});

export const useAuthContext = () => useContext(authCtx);

export const AuthProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initState);

  function authSuccess(token: string, userId: string, user: any) {
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

  function startRefreshTokenTimer(token: string) {
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
