import { getSession, signIn } from "next-auth/client";
import { DECREASED_VALUE_MS } from "../../util/const";

export function onStartRefreshToken(token, refreshToken, timer) {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const timeout = exp * 1000 - DECREASED_VALUE_MS - Date.now();
    console.log(timeout);
    timer = setTimeout(() => {
      refreshToken();
    }, timeout);
    return timer;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function onRefreshToken(authSuccess, startRefreshTokenTimer) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
    });

    if (result.error) {
      throw new Error(result.error);
    }
    const { accessToken, user } = await getSession();
    console.log("{{{rt}}}", user, accessToken);
    authSuccess(accessToken, user.userId, user);
    startRefreshTokenTimer(accessToken);
  } catch (error) {
    console.log(error);
    // logout();
  }
}
