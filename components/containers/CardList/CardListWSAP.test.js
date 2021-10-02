import { RadioGroup, Select } from "@material-ui/core";
import { mount, shallow } from "enzyme";
import { withHooks } from "jest-react-hooks-shallow";
import * as router from "next/router";
import CardItem from "../../ui/CardItem/CardItem";
import CardList from "./CardList";
import CardListSettings from "./CardListSettings";
import CartListWithSettingsAndPagination from "./CartListWithSettingsAndPagination";
import * as cardListSettingsDependencies from "./dependencies/cardListSettings";

describe("<CartListWithSettingsAndPagination/>", () => {
  let spyedUseRouter, spyedFilterUrl, CardListWSAP;
  let products = [];
  beforeAll(() => {
    for (let x = 1; x <= 13; x++) {
      products.push({
        _id: new Date(x).toISOString(),
        title: `title ${x}`,
        description: `desc ${x}`,
        price: 100 * x,
        imageUrl: "",
        section: "",
      });
    }
  });

  beforeEach(() => {
    spyedUseRouter = jest.spyOn(router, "useRouter");
    spyedUseRouter.mockImplementation(() => ({
      query: {},
      push: (url) => url,
    }));

    spyedFilterUrl = jest.spyOn(cardListSettingsDependencies, "filterUrl");
    // spyedFilterUrl.mockImplementation((arg1, arg2, arg3) => [arg1, arg2, arg3]);

    CardListWSAP = shallow(
      <CartListWithSettingsAndPagination products={products} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    spyedUseRouter.mockReset();
  });

  it("should render CardList > CartItem * 13 ", () => {
    expect(CardListWSAP.find(CardList).dive().find(CardItem)).toHaveLength(13);
  });

  it("sould render CardListSettings * 1 if products.length > 1", () => {
    expect(CardListWSAP.find(CardListSettings)).toHaveLength(1);
  });

  it("sould'nt render CardListSettings  if products.length < 1", () => {
    CardListWSAP.setProps({ products: [] });
    expect(CardListWSAP.find(CardListSettings)).toHaveLength(0);
  });

  it("<CardListSettings/> should collect expected data from select", () => {
    CardListWSAP.setProps({ baseSortUrl: "/sort/all" });
    const cardListSettingsWrapper = CardListWSAP.find(CardListSettings).dive();
    cardListSettingsWrapper
      .find(Select)
      .simulate("change", { target: { value: "price" } });
    expect(spyedFilterUrl).toHaveBeenCalledWith("price", "asc", "/sort/all");
  });

  it("<CardListSettings/> should collect expected data from radio buttons", () => {
    CardListWSAP.setProps({ baseSortUrl: "/sort/all" });
    const cardListSettingsWrapper = CardListWSAP.find(CardListSettings).dive();
    cardListSettingsWrapper
      .find(RadioGroup)
      .simulate("change", { target: { value: "desc" } });
    expect(spyedFilterUrl).toHaveBeenCalledWith("", "desc", "/sort/all");
  });

  it("<Radio/> buttons should be disabeled if sort is empty string", () => {
    const cardListSettingsWrapper = CardListWSAP.find(CardListSettings).dive();
    expect(
      cardListSettingsWrapper
        .find(RadioGroup)
        .children()
        .findWhere((radio) => radio.prop("disabled") === true)
    ).toHaveLength(2);
  });
});
