import * as authCtxUtil from "./authCtx.util";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSHVzc2FtIiwiaWQiOiI1ZjlmYzExN2Q2M2Y0ODBlOGZkYzdhMGUiLCJpYXQiOjE2MzMxODU1NzksImV4cCI6MTYzMzE4OTE3OX0.2V7XGh1P2FtV9Ro_49xTTF431MFIE7Dvx8zuzDQgceo";

jest.useFakeTimers();

describe("Auth Context", () => {
  let spyedOnRefreshToken: jest.SpyInstance,
    spyedOnStartRefreshToken: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    spyedOnStartRefreshToken = jest.spyOn(authCtxUtil, "onStartRefreshToken");
    spyedOnRefreshToken = jest.spyOn(authCtxUtil, "onRefreshToken");
  });

  it("onStartRefreshToken() should work well", () => {
    const { onStartRefreshToken } = authCtxUtil;
    jest.spyOn(global, "setTimeout");
    /**
     * change implementaion of parse method to make it return object with exp prop
     * that contain Date time > Date.now() by 1h (3600s)
     */
    JSON.parse = jest.fn(() => ({ exp: Date.now() / 1000 + 3600 }));
    const mockedRefreshToken = jest.fn();

    let timer = onStartRefreshToken(
      accessToken,
      mockedRefreshToken,
      setTimeout(() => {})
    );

    // exp > Date.now()
    expect(timer).toBeTruthy();
    expect(setTimeout).toBeCalledTimes(2);
    // should called with timeout's callback func and (1 hour - 10s) duration
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3590000);
    jest.runOnlyPendingTimers();
    expect(mockedRefreshToken).toHaveBeenCalledTimes(1);
    // exp < Date.now
    JSON.parse = jest.fn(() => ({ exp: 1 }));
    timer = onStartRefreshToken(
      accessToken,
      () => {},
      setTimeout(() => {})
    );
    expect(timer).toBe(3);
  });

  it("onRefreshToken() should work well", async () => {
    const { onRefreshToken } = authCtxUtil;
    const mockedAuthSuccess = jest.fn();
    const mockedStartRefreshTokenTimer = jest.fn();
    await onRefreshToken(mockedAuthSuccess, mockedStartRefreshTokenTimer);
    expect(spyedOnRefreshToken).toHaveBeenCalled();
    expect(mockedAuthSuccess).toHaveBeenCalled();
    expect(mockedAuthSuccess).toHaveBeenCalledWith(accessToken, "9292", {
      name: "hussam",
      userId: "9292",
    });
    expect(mockedStartRefreshTokenTimer).toHaveBeenCalled();
    expect(mockedStartRefreshTokenTimer).toHaveBeenCalledWith(accessToken);
  });
});
