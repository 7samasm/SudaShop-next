const initState = {
  mostComments: [],
  productsMayWant: [],
};

const productReducer = (
  state = initState,
  { type, mostComments, productsMayWant }
) => {
  switch (type) {
    case "SET_MOST_COMMENTS":
      return {
        ...state,
        mostComments,
      };
    case "SET_PRODS_MAY_WANT":
      return {
        ...state,
        productsMayWant,
      };
    default:
      return state;
  }
};

export default productReducer;
