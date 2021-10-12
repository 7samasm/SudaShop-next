import { createContext, FC, useContext, useState } from "react";
import axiosBuilder from "../axios";
import ISection from "../types/Section";

const sectionsCtx = createContext<{
  sections: ISection[];
  loadSections: () => Promise<void>;
}>({
  sections: [],
  loadSections: async () => {},
});

export const useSectionContext = () => useContext(sectionsCtx);

export const SectionsProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [sections, setSections] = useState<ISection[]>([]);
  async function loadSections(): Promise<void> {
    try {
      const { data } = await axiosBuilder().get("/sections");
      setSections(data);
    } catch (error) {
      console.log(error);
      setSections([]);
    }
  }
  const ctx = {
    sections,
    loadSections,
  };
  return <sectionsCtx.Provider value={ctx}>{children}</sectionsCtx.Provider>;
};

export default sectionsCtx;
