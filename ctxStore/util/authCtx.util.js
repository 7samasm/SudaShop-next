import { getSession, signIn } from "next-auth/client";

export function onStartRefreshToken(token, refreshToken, timer) {
  try {
    const expiredJWT = JSON.parse(atob(token.split(".")[1]));
    console.log(expiredJWT);
    const expire = new Date(expiredJWT.exp * 1000);
    console.log(expire);
    const timeout = expire.getTime() - new Date().getTime() - 10000;
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
