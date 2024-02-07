import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "./SideBar";
import Header from "./Header";

export default function DefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header user={user} />
      <SideBar />
      <Outlet />
    </div>
  );
}
