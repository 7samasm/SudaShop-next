import { getSession, signIn } from "next-auth/client";
import { DECREASED_VALUE_MS } from "../../util/const";

export function onStartRefreshToken(
  token: string,
  refreshToken: () => void,
  timer: NodeJS.Timeout
) {
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  const expiryTimeDecreasedByTenSeconds = exp * 1000 - DECREASED_VALUE_MS;
  if (expiryTimeDecreasedByTenSeconds > Date.now()) {
    const timeout = expiryTimeDecreasedByTenSeconds - Date.now();
    console.log(timeout);
    timer = setTimeout(() => {
      refreshToken();
    }, timeout);
  }
  return timer;
}

export async function onRefreshToken(
  authSuccess: (token: string, userId: string, user: any) => void,
  startRefreshTokenTimer: (token: string) => void
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    const { accessToken, user } = (await getSession()) as {
      accessToken: string;
      user: { [k: string]: any };
    };
    console.log("{{{rt}}}", user, accessToken);
    authSuccess(accessToken, user.userId, user);
    startRefreshTokenTimer(accessToken);
  } catch (error) {
    console.log(error);
    // logout();
  }
}
