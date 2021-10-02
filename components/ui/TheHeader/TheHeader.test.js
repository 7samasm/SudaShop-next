import React from "react";
import { shallow } from "enzyme";
import TheHeader from "./TheHeader";
import { withHooks } from "jest-react-hooks-shallow";
import callback from "./callback";
import * as AuthContext from "../../../ctxStore/authCtx";
import Link from "next/link";

jest.mock("./callback", () => jest.fn());

describe("<TheHeader/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should called useEffect 1x", () => {
    withHooks(() => {
      shallow(<TheHeader />);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("should render auth-requierd parts if user authenticeted ", () => {
    const spy = jest.spyOn(AuthContext, "useAuthContext");
    spy.mockImplementation(() => ({
      isLoggedIn: true,
    }));
    const wrapper = shallow(<TheHeader />);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith({ isLoggedIn: true });
    expect(
      wrapper
        .find(Link)
        .findWhere((link) => link.prop("className") === "cond-render").length
    ).toBe(4);
  });

  it("should't render auth-requierd parts if user unauthenticeted ", () => {
    const spy = jest.spyOn(AuthContext, "useAuthContext");
    spy.mockImplementation(() => ({
      isLoggedIn: false,
    }));
    const wrapper = shallow(<TheHeader />);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith({ isLoggedIn: false });
    expect(
      wrapper
        .find(Link)
        .findWhere((link) => link.prop("className") === "cond-render").length
    ).toBe(1);
  });

  it("should contain text logo [[SudaShop]]", () => {
    const wrapper = shallow(<TheHeader />);
    expect(wrapper.contains("SudaShop")).toBe(true);
  });
});
