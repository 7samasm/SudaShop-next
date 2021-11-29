import { getSession, signIn } from "next-auth/client";

export async function onLogin(
  email: string,
  password: string,
  authSuccess: (token: string, uid: string, user: { [k: string]: any }) => void,
  getAndSetCart: (token: string) => void,
  startRefreshTokenTimer: (token: string) => void
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
    const session = await getSession();
    if (session) {
      const { accessToken, user } = session as {
        accessToken: string;
        user: { [k: string]: any };
      };
      console.log(user);
      authSuccess(accessToken, user.userId, user);
      await getAndSetCart(accessToken);
      startRefreshTokenTimer(accessToken);
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
