import { shallow } from "enzyme";
import { withHooks } from "jest-react-hooks-shallow";

import Test from "./Test";
import callback from "./callback";

jest.mock("./callback", () => jest.fn((param) => param * 10));

describe("UI Components", () => {
  describe("<Test/>", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should called use effect 2x", () => {
      withHooks(() => {
        const wrapper = shallow(<Test />);
        expect(wrapper.find("h1").text()).toContain("false");
        wrapper.find("button").simulate("click");
        expect(wrapper.find("h1").text()).toContain("true");
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(10);
        expect(callback).toHaveReturnedWith(100);
      });
    });
  });
});
