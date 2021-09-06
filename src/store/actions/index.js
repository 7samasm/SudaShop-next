import { refreshToken } from "./auth";
import { setSections } from "./configrations";
import { setMostComments, setProductsMayWant } from "./product";

export { setDrawer, setSections } from "./configrations";
export { setCart } from "./cart";
export {
  logout,
  authSuccess,
  refreshToken,
  startRefreshTokenTimer,
} from "./auth";

export const onClientInit = () => async (dispatch) => {
  dispatch(setSections());
  dispatch(setMostComments());
  dispatch(setProductsMayWant());
  if (localStorage.getItem("isLoggedIn")) dispatch(refreshToken());
};
