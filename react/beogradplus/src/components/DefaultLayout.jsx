import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "./SideBar";
import Header from "./Header";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { MenuContextProvider } from "../contexts/MenuContext";

export default function DefaultLayout() {
  const { user, setUser, token, setToken } = useStateContext();

  // fetch current user
  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data.data);
      });
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <MenuContextProvider>
      <Header />
      <SideBar />
      <Outlet />
    </MenuContextProvider>
  );
}
