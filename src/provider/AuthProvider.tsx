import { createContext, useState, useEffect } from "react";
import { Creds, loginCreds } from "../db/db";
import sign from "jwt-encode";
import jwt_decode from "jwt-decode";

const SECRET = "secret";
type authMethodsType = {
  authState: AuthTokeType;
  login: (credentials: LoginCredsType) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  loading: boolean;
};

type AuthTokeType = {
  hasToken: boolean | null;
  user: Creds | null;
};

export type LoginCredsType = {
  email: string;
  password: string;
};

const AuthContext = createContext<authMethodsType | null>(null);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authState, setAuthState] = useState<AuthTokeType>({
    hasToken: null,
    user: null,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(JSON.parse(token)) as Creds;

      if (decodedToken) {
        // Set the token and user object in the authentication state
        setAuthState({ hasToken: true, user: decodedToken });
        setLoading(false);
      } else {
        // Token has expired, log out the user
        logout();
      }
    }
  }, []);

  const login = async (credentials: LoginCredsType) => {
    try {
      // Send a login request to your authentication API endpoint
      const query = await loginCreds;
      const response = query.find(
        (user) =>
          user.email === credentials.email.toLowerCase() &&
          user.password === credentials.password
      );

      if (response) {
        // Set the token and user object in the authentication state
        setAuthState({ hasToken: true, user: response });

        // Store the token in local storage to persist the user's login state
        localStorage.setItem("token", JSON.stringify(sign(response, SECRET)));
        setLoading(false);
      } else {
        throw new Error("Wrong email or password.");
      }
    } catch (error: any) {
      alert(error?.message);
    }
  };

  const logout = () => {
    // Clear the token and user object from the authentication state
    setAuthState({ hasToken: null, user: null });

    // Remove the token from local storage to log out the user
    localStorage.removeItem("token");

    setLoading(false);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const decoded: AuthTokeType = token ? JSON.parse(token) : false;
    if (!decoded) {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
