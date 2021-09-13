import axiosBuilder from "../axios";

const { createContext, useState } = require("react");

const sectionsCtx = createContext({
  sections: [],
  loadSections: async function () {},
});

export const SectionsProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  async function loadSections() {
    try {
      const { data } = await axiosBuilder().get("/sections");
      setSections(data);
    } catch (error) {
      console.log(error);
    }
  }
  const ctx = {
    sections,
    loadSections,
  };
  return <sectionsCtx.Provider value={ctx}>{children}</sectionsCtx.Provider>;
};

export default sectionsCtx;
