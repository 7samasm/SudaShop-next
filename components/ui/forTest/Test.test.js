import { shallow } from "enzyme";
import { withHooks } from "jest-react-hooks-shallow";

import Test from "./Test";
jest.mock("./callback");
import callback from "./callback";

describe("UI Components", () => {
  describe("<Test/>", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("callback should returend undifined", () => {
      callback("foo");
      expect(callback).toHaveBeenCalledWith("foo");
    });

    it("should called use effect 2x", () => {
      withHooks(() => {
        const wrapper = shallow(<Test />);
        expect(wrapper.find("h1").text()).toContain("false");
        callback.mockImplementation((arg) => arg * 10);
        wrapper.find("button").simulate("click");
        expect(wrapper.find("h1").text()).toContain("true");
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(10);
        expect(callback).toHaveReturnedWith(100);
      });
    });
  });
});
