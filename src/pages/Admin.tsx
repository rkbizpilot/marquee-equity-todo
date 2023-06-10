import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Admin = () => {
  return (
    <div
      className="flex min-h-screen h-full flex-row flex-grow my-auto"
      style={{
        backgroundImage: `url(https://static-cse.canva.com/blob/572643/2.Freephotos.jpg)`
      }}
    >
      <div className="hidden md:flex  md:relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[80vw] md:max-w-[60vw] xl:max-w-[75vw] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
