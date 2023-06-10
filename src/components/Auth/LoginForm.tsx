import { useContext, useState } from "react";
import { Button } from "../Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AuthContext, LoginCredsType } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  //states
  const [error, setError] = useState({ isError: false, errorMsg: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [creds, setCreds] = useState<LoginCredsType>({
    email: "",
    password: ""
  });

  //context
  const auth = useContext(AuthContext);

  //navigate
  const navigate = useNavigate();

  //login submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      auth?.login(creds);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                error.isError ? "text-red-500" : "text-gray-700"
              }`}
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={creds.email}
                required
                className={`block w-full appearance-none rounded-md border ${
                  error.isError ? "border-red-300" : "border-gray-300"
                } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                onChange={(e) => {
                  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
                  if (!regex.test(e.target.value)) {
                    setError({
                      isError: true,
                      errorMsg: "Please enter a valid email address"
                    });
                  } else {
                    setError({ isError: false, errorMsg: "" });
                  }

                  setCreds({ ...creds, email: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                error.isError ? "text-red-500" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative flex items-center mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`block w-full appearance-none rounded-md border ${
                  error.isError ? "border-red-300" : "border-gray-300"
                } pl-3 pr-12 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                onChange={(e) => {
                  if (e.target.value.length < 7) {
                    setError({
                      isError: true,
                      errorMsg: "Password must be at least 7 characters"
                    });
                  } else {
                    setError({ isError: false, errorMsg: "" });
                  }
                  setCreds({ ...creds, password: e.target.value });
                }}
              />
              <div
                className="absolute inset-y-0 right-1 flex items-center py-1.5 pr-1.5 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                )}
              </div>
            </div>
          </div>
          {error.isError && (
            <span className="inline-block font-medium text-red-500">
              {error.errorMsg}
            </span>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                creds.email === "" || creds.password === "" || error.isError
              }
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
