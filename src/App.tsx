import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./App.css";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { AuthContext } from "./provider/AuthProvider";
import { useContext } from "react";
import RequireAuth from "./provider/RequireAuth";
import { Dashboard } from "./pages/Dashboard";
import ErrorBoundary from "./provider/ErrorBoundary";
import { Completed } from "./pages/Completed";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route errorElement={<ErrorBoundary />}>
        <Route path="/admin">
          <Route
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          >
            <Route errorElement={<ErrorBoundary />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Navigate to="dashboard" />
                  </RequireAuth>
                }
              />
              <Route
                path="dashboard"
                element={
                  <RequireAuth redirectTo="/login">
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="completed"
                element={
                  <RequireAuth redirectTo="/login">
                    <Completed />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </>
  )
);

function LandingPage() {
  const auth = useContext(AuthContext);

  if (auth?.isAuthenticated()) {
    return <Navigate to="/admin" />;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
