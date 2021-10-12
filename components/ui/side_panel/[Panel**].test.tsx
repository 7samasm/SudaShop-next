import { Typography } from "@material-ui/core";
import { shallow, ShallowWrapper } from "enzyme";
import PanelItem from "./PanelItem/PanelItem";
import PanelList from "./PanelList/PanelList";

describe("<PanelList/>", () => {
  let panelListWrapper: ShallowWrapper;
  beforeEach(() => {
    panelListWrapper = shallow(
      <PanelList
        title="see also"
        productList={[
          { _id: "1", title: "test1" },
          { _id: "2", title: "test2" },
          { _id: "3", title: "test3" },
        ]}
      />
    );
  });

  test("sould render 3x panel Item", () => {
    expect(panelListWrapper.find(PanelItem)).toHaveLength(3);
  });

  test("sould render 1x panel Item", () => {
    panelListWrapper.setProps({ productList: [{ _id: "1", title: "test" }] });
    expect(panelListWrapper.find(PanelItem)).toHaveLength(1);
  });

  test("should <PanelItem/> render as expected !", () => {
    const panelWrapper = panelListWrapper.find(PanelItem).at(0).dive();
    expect(
      panelWrapper.find(Typography).text().startsWith("test1")
    ).toBeTruthy();
  });
});
