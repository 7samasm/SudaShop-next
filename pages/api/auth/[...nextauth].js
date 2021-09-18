import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axiosBuilder from "../../../axios";
export default NextAuth({
  callbacks: {
    jwt(token, user) {
      if (user) {
        const userCopy = { ...user };
        ["refreshToken", "token", "tokenExpireIn"].forEach((el) => {
          delete userCopy[el];
        });
        return {
          accessToken: user.token,
          // accessTokenExpires: Date.now() + user.tokenExpireIn * 1000,
          accessTokenExpires: user.tokenExpireIn,
          refreshToken: user.refreshToken,
          user: userCopy,
          error: null,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) return token;
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session(session, token) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      console.log(session);
      return session;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize({ email, password }, req) {
        // Add logic here to look up the user from the credentials supplied
        const { data } = await axiosBuilder(null, true).post("/admin/login", {
          email,
          password,
        });
        const user = data;
        console.log(data);
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
  try {
    const { data } = await axiosBuilder(null, true).post(
      `/admin/refresh-token?refresh_token=${token.refreshToken}`
    );
    const refreshedToken = data;
    return {
      ...token,
      accessToken: refreshedToken.token,
      // accessTokenExpires: Date.now() + refreshedToken.tokenExpireIn * 1000,
      accessTokenExpires: refreshedToken.tokenExpireIn,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
