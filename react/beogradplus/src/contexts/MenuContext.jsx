import { createContext, useContext, useState } from "react";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const MenuStateContext = createContext({
  menuOption: null,
  data: null,
  setMenuOption: () => {},
  setData: () => {},
  allStopsPos: null,
});

export const MenuContextProvider = ({ children }) => {
  const [menuOption, setMenuOption] = useState(0);
  const [data, setData] = useState({});

  return (
    <MenuStateContext.Provider
      value={{
        menuOption,
        data,
        setMenuOption,
        setData,
      }}
    >
      {children}
    </MenuStateContext.Provider>
  );
};

export const useMenuStateContext = () => useContext(MenuStateContext);
