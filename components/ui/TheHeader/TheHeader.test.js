import React from "react";
import { shallow } from "enzyme";
import TheHeader from "./TheHeader";
import { withHooks } from "jest-react-hooks-shallow";
import callback from "./callback";
import * as AuthContext from "../../../ctxStore/auth_ctx";
import { Badge } from "@material-ui/core";

jest.mock("./callback", () => jest.fn());

describe("UI Components", () => {
  describe("<TheHeader/>", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should called use effect 1x", () => {
      withHooks(() => {
        const wrapper = shallow(<TheHeader />);
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    it("should render cart badge if user authenticated ", () => {
      jest.spyOn(AuthContext, "useAuthContext").mockImplementation(() => ({
        isLoggedIn: true,
      }));
      const wrapper = shallow(<TheHeader />);
      expect(
        wrapper.find(Badge).findWhere((B) => B.prop("className") === "cart")
          .length
      ).toBe(1);
    });

    it("should'nt render cart badge if user unauthenticated ", () => {
      jest.spyOn(AuthContext, "useAuthContext").mockImplementation(() => ({
        isLoggedIn: false,
      }));
      const wrapper = shallow(<TheHeader />);
      expect(
        wrapper.find(Badge).findWhere((B) => B.prop("className") === "cart")
          .length
      ).toBe(0);
    });

    it("should contain text logo [[SudaShop]]", () => {
      const wrapper = shallow(<TheHeader />);
      expect(wrapper.contains("SudaShop")).toBe(true);
    });
  });
});
