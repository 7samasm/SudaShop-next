module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.API_URL,
  },
  // async rewrite() {
  //   return [
  //     {
  //       source: "/hpi/:path*",
  //       destination: "http://localhost:3000/hpi/:path*",
  //     },
  //   ];
  // },
};
