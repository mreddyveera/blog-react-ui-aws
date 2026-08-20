import { RouteIndex, RouteSignIn } from "@/helpers/RouteName.js";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminAllowed = () => {
  const user = useSelector((state) => state.user);
  if (user?.isLoggedIn && user?.user?.role==="admin") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
  else{
    return <Navigate to={RouteSignIn}/>
  }
};

export default OnlyAdminAllowed;
