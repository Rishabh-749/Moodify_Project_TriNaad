import React from "react";
import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import AdminProtected from "./features/auth/components/AdminProtected";
import Home from "./features/Home/pages/Home";
import AdminUpload from "./features/Home/pages/AdminUpload";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/admin/upload",
    element: <AdminProtected><AdminUpload /></AdminProtected>,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);
