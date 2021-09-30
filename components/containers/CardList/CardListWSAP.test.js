import { RadioGroup, Select } from "@material-ui/core";
import { shallow } from "enzyme";
import * as router from "next/router";
import CardItem from "../../ui/CardItem/CardItem";
import CardList from "./CardList";
import CardListSettings from "./CardListSettings";
import CartListWithSettingsAndPagination from "./CartListWithSettingsAndPagination";
import * as cardListSettingsDependencies from "./dependencies/cardListSettings";

describe("<CartListWithSettingsAndPagination/>", () => {
  let spy, spyedDoFilter, CardListWSAP;
  beforeEach(() => {
    spy = jest.spyOn(router, "useRouter");
    spy.mockImplementation(() => ({
      query: {},
    }));

    spyedDoFilter = jest.spyOn(cardListSettingsDependencies, "doFilter");
    spyedDoFilter.mockImplementation((arg1, arg2, arg3) => [arg1, arg2, arg3]);

    CardListWSAP = shallow(
      <CartListWithSettingsAndPagination
        products={[
          {
            _id: "",
            title: "test",
            description: "test",
            price: 1000,
            imageUrl: "",
            section: "",
          },
        ]}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    spy.mockReset();
  });

  it("should render CardList > CartItem * 1 ", () => {
    expect(CardListWSAP.find(CardList).dive().find(CardItem)).toHaveLength(1);
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
    expect(spyedDoFilter).toHaveReturnedWith(["price", "asc", "/sort/all"]);
  });

  it("<CardListSettings/> should collect expected data from radio buttons", () => {
    CardListWSAP.setProps({ baseSortUrl: "/sort/all" });
    const cardListSettingsWrapper = CardListWSAP.find(CardListSettings).dive();
    cardListSettingsWrapper
      .find(RadioGroup)
      .simulate("change", { target: { value: "desc" } });
    expect(spyedDoFilter).toHaveReturnedWith(["", "desc", "/sort/all"]);
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
