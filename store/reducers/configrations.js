import { TOGGLE_DRAWER, SET_SECTIONS } from "../actions/actionTypes";
const initState = {
  drawer: false,
  sections: [],
};

const configReducer = (state = initState, { type, sections }) => {
  switch (type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: !state.drawer,
      };
    case SET_SECTIONS:
      return {
        ...state,
        sections,
      };
    default:
      return state;
  }
};

export default configReducer;
