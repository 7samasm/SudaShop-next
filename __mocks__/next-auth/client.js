export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSHVzc2FtIiwiaWQiOiI1ZjlmYzExN2Q2M2Y0ODBlOGZkYzdhMGUiLCJpYXQiOjE2MzMwODU0MDMsImV4cCI6MTYzMzA4NTQyM30.CMUZXzlz6AqxqWEIDU2PeAokW1kTdAmt5XNMAlSMKjY";
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
