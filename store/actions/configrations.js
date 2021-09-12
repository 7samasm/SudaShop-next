import { TOGGLE_DRAWER, SET_SECTIONS } from "./actionTypes";
import axios from "../../axios";

export const setDrawer = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAWER });
  };
};

export const setSectionsDispach = (sections) => {
  return {
    type: SET_SECTIONS,
    sections,
  };
};

export const setSections = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios().get("/sections");
      dispatch(setSectionsDispach(data));
    } catch (error) {
      console.log(error);
    }
  };
};
