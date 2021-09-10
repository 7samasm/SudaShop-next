import axios from "../../axios";

export const setMostComments = () => {
  return async (dispatch) => {
    try {
      const mostComments = (await axios().get("products/stats/common")).data;
      dispatch({ type: "SET_MOST_COMMENTS", mostComments });
    } catch (error) {
      alert(error);
    }
  };
};

export const setProductsMayWant = () => {
  return async (dispatch) => {
    try {
      const productsMayWant = (await axios().get("products/?limit=3")).data
        .docs;
      dispatch({ type: "SET_PRODS_MAY_WANT", productsMayWant });
    } catch (error) {
      alert(error);
    }
  };
};

/*export const setProducts = (products) => {
  return (dispatch, getState) => {
    // console.log("[getState] => ", getState());
    dispatch({
      type: SET_PRODUCTS,
      products,
    });
  };
};*/

/*export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const axiosOptions = { headers: { "x-Auth": token } };
      // delete product in server
      await axios.post("admin/delete-product", { productId }, axiosOptions);
      // update ui to reflect deleted item
      const {
        data: { docs },
      } = await axios.get("admin/products", axiosOptions);
      dispatch(setProducts(docs));
    } catch (error) {
      console.log(error);
    }
  };
};*/
