import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../pages/Dashboard/helper/storage";

const Guest = () => {
  const auth = getAuthUser();
  const type = localStorage.getItem("type");

  if (auth) {
    if (type === "1") {
      return <Navigate to="/AdminDashboard" />;
    } else if (type === "0") {
      return <Navigate to="/BookList" />;
    }
  }

  return <Outlet/>;
};

export default Guest;
