import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { Button } from "../components/Button";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

function ErrorBoundary() {
  const error = useRouteError();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = (e: any) => {
    (e as any).preventDefault && (e as any).preventDefault();
    auth?.logout();
    navigate("/");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-4 rounded-xl bg-red-200 w-1/3 flex flex-col items-center text-center">
        <h1 className="text-red-500 text-3xl font-bold mb-4 w-full">
          {error instanceof Error ? error.message : "Sorry there was an error"}
        </h1>
        <FaceFrownIcon className="h-6 w-6 text-red-500 " />
        <Button onClick={(e) => logout(e)}>Logout</Button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
