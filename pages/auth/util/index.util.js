import { getSession, signIn } from "next-auth/client";

export async function onLogin(
  email,
  password,
  authSuccess,
  getAndSetCart,
  startRefreshTokenTimer
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error);
    }
    const { accessToken, user } = await getSession();
    console.log(user);
    authSuccess(accessToken, user.userId, user);
    await getAndSetCart(accessToken);
    startRefreshTokenTimer(accessToken);
  } catch (error) {
    console.log(error.message);
  }
}
