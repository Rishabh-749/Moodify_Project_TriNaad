import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";
import "../styles/auth.scss";

const AdminProtected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading center size="main" main />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;
