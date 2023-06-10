import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({
  redirectTo,
  children
}: {
  redirectTo?: string;
  children: React.ReactNode;
}) => {
  const getIsAuthed = () => {
    const hasToken = localStorage.getItem("token");
    if (!hasToken) {
      return false;
    }

    return true;
  };
  const isAuthed = getIsAuthed();
  const redirect = redirectTo ? redirectTo : "/login";

  return isAuthed ? <>{children}</> : <Navigate to={redirect} />;
};

export default RequireAuth;
