import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { StateProvider } from "./provider/StateProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <StateProvider>
      <App />
    </StateProvider>
  </AuthProvider>
);
