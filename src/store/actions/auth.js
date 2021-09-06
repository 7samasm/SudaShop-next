import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";
import Axios from "../../axios";
import { setCart } from "./cart";
var timer;
export const authSuccess = (token, userId, expirationDate, user) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_SUCCESS,
      token,
      userId,
      expirationDate,
      user,
    });
  };
};

export const logout = () => {
  ["isLoggedIn", "user"].forEach((item) => {
    localStorage.removeItem(item);
  });
  clearTimeout(timer);
  return (dispatch) => {
    dispatch({ type: AUTH_LOGOUT });
  };
};

export const refreshToken = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { token },
      } = await Axios().post("/admin/refresh-token");
      console.log(token);
      const {
        data: { user },
      } = await Axios(token).get("/admin/user");
      const { data } = await Axios(token).get("/admin/cart");
      dispatch(setCart(data));
      const { id, exp } = JSON.parse(atob(token.split(".")[1]));
      const expDate = new Date(exp * 1000);
      dispatch(authSuccess(token, id, expDate, user));
      dispatch(startRefreshTokenTimer());
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  };
};

export const startRefreshTokenTimer = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const expiredJWT = JSON.parse(atob(token.split(".")[1]));
    console.log(expiredJWT);
    const expire = new Date(expiredJWT.exp * 1000);
    console.log(expire);
    const timeout = expire.getTime() - new Date().getTime() - 1000;
    timer = setTimeout(() => {
      dispatch(refreshToken());
    }, timeout);
    // console.log(`%c ${timer}`, "font-size:18px;color:#4c3bd4");
    // console.log(`%c ${getState().auth}`, "font-size:18px;color:#4c3bd4");
  };
};
