import { createContext, useContext, useState } from "react";

const MenuStateContext = createContext({
  menuOption: null,
  data: null,
  setMenuOption: () => {},
  setData: () => {},
});

export const MenuContextProvider = ({ children }) => {
  const [menuOption, setMenuOption] = useState("stop");
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
