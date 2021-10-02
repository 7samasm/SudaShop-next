export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSHVzc2FtIiwiaWQiOiI1ZjlmYzExN2Q2M2Y0ODBlOGZkYzdhMGUiLCJpYXQiOjE2MzMxODU1NzksImV4cCI6MTYzMzE4OTE3OX0.2V7XGh1P2FtV9Ro_49xTTF431MFIE7Dvx8zuzDQgceo";
module.exports = {
  getSession() {
    return Promise.resolve({
      accessToken,
      user: { name: "hussam", userId: "9292" },
    });
  },
  signIn() {
    return Promise.resolve({ error: null });
  },
};
