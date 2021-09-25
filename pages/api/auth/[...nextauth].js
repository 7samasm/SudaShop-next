import NextAuth from "next-auth";
import { getSession } from "next-auth/client";
import Providers from "next-auth/providers";
import axiosBuilder from "../../../axios";
import * as chalk from "chalk";
export default NextAuth({
  callbacks: {
    async jwt(token, user) {
      console.log(chalk.yellow("[[jwt cb called ]]"));
      if (user) {
        console.log(chalk.bgBlack.magenta("user found"));
        const userCopy = { ...user };
        ["refreshToken", "token", "tokenExpireIn"].forEach((el) => {
          delete userCopy[el];
        });
        return {
          accessToken: user.token,
          accessTokenExpireDate: new Date(
            new Date(user.tokenExpireIn * 1000).getTime() + new Date().getTime()
          ),
          refreshToken: user.refreshToken,
          user: userCopy,
          error: null,
        };
      }
      /**
       * Return previous token if the access token has not expired yet
       * we subtract 10k ms to refresh token befor expire by 10 s
       */
      if (new Date(new Date(token.accessTokenExpireDate) - 1000) > new Date())
        return token;
      // Access token has expired, try to update it
      const refreshedToken = await refreshAccessToken(token);
      return refreshedToken;
    },
    async session(session, token) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpireDate = token.accessTokenExpireDate;
      session.error = token.error;
      return session;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize({ email, password }, req) {
        if (email && password) {
          // Add logic here to look up the user from the credentials supplied
          const { data } = await axiosBuilder().post("/admin/login", {
            email,
            password,
          });
          const user = data;
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null or false then the credentials will be rejected
            return null;
            // You can also Reject this callback with an Error or with a URL:
            // throw new Error('error message') // Redirect to error page
            // throw '/path/to/redirect'        // Redirect to a URL
          }
        } else {
          const session = await getSession({ req });
          if (session) {
            const { data } = await axiosBuilder().post(
              `/admin/refresh-token?refresh_token=${session.refreshToken}`
            );
            const user = data;
            if (user) return user;
            console.log("[[faild]]");
            return null;
          }
        }
      },
    }),
  ],
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log(
    chalk.bgBlue.white(
      "[[refreshAccessToken {{token param}} ]]",
      JSON.stringify(token)
    )
  );
  try {
    const { data } = await axiosBuilder().post(
      `/admin/refresh-token?refresh_token=${token.refreshToken}`
    );
    const refreshedToken = data;
    return {
      ...token,
      accessToken: refreshedToken.token,
      accessTokenExpires: refreshedToken.tokenExpireIn,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(chalk.bgRed.yellow(error?.response.data.message));
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
