import Link from "next/link";
import { shallow } from "enzyme";
import * as authCtx from "../../../ctxStore/auth_ctx";
import TheDrawer from "./TheDrawer";
import { withHooks } from "jest-react-hooks-shallow";
import callback from "./callback";

jest.mock("./callback", () => jest.fn());
describe("<TheDrawer/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should called useEffect 1x", () => {
    withHooks(() => {
      shallow(<TheDrawer />);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("should render auth-requierd parts if user authenticeted", () => {
    const spy = jest.spyOn(authCtx, "useAuthContext");
    spy.mockImplementation(() => ({
      isLoggedIn: true,
    }));
    const wrapper = shallow(<TheDrawer />);
    expect(spy).toHaveBeenCalled();
    expect(
      wrapper
        .find(Link)
        .findWhere((link) => link.prop("className") === "cond-render").length
    ).toBe(3);
  });

  it("should't render auth-requierd parts if user unauthenticeted", () => {
    const spy = jest.spyOn(authCtx, "useAuthContext");
    spy.mockImplementation(() => ({
      isLoggedIn: false,
    }));
    const wrapper = shallow(<TheDrawer />);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith({ isLoggedIn: false });
    expect(
      wrapper
        .find(Link)
        .findWhere((link) => link.prop("className") === "cond-render").length
    ).toBe(1);
  });
});
