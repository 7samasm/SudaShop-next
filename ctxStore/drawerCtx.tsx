import { createContext, useState, useContext, FC } from "react";

const drawerCtx = createContext({
  drawerIsOpen: false,
  openDrawer: function () {},
  closeDrawer: function () {},
});

export const useDrawerContext = () => useContext(drawerCtx);

export const DrawerProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  function openDrawer() {
    setDrawerIsOpen(true);
  }
  function closeDrawer() {
    setDrawerIsOpen(false);
  }
  const ctx = {
    drawerIsOpen,
    openDrawer,
    closeDrawer,
  };
  return <drawerCtx.Provider value={ctx}>{children}</drawerCtx.Provider>;
};

export default drawerCtx;
