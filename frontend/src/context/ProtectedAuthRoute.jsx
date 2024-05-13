import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

export default function ProtectedAuthRoute() {
  const { userToken } = useContext(UserContext);

  return userToken ? <Outlet /> : <Navigate to="/" />;
}
