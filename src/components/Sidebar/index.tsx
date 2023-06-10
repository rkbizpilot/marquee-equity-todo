// import Avatar from "react-avatar";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import {
  ArrowLeftOnRectangleIcon,
  CheckCircleIcon,
  SunIcon
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {
  name: string;
  handleClick: () => void;
};
const Logout = ({ name, handleClick }: Props) => (
  <div
    className={`py-4  flex justify-start items-center hover:cursor-pointer hover:text-blue-700`}
    onClick={handleClick}
  >
    <div className="flex justify-start items-center px-8 pt-4">
      <ArrowLeftOnRectangleIcon className={`h-6 w-6 text-indigo-700 mr-4`} />
      <p className={`text-base font-semibold`}>{name}</p>
    </div>
  </div>
);

export const Sidebar = () => {
  const auth = useContext(AuthContext);
  const user = auth?.authState?.user;
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    {
      name: "My Day",
      link: "/admin/dashboard",
      icon: <SunIcon className="h-6 w-6 text-indigo-700 " />
    },
    {
      name: "Completed",
      link: "/admin/completed",
      icon: <CheckCircleIcon className="h-6 w-6 text-indigo-700 " />
    }
  ];
  return (
    <div className="flex justify-start items-center flex-col sticky  h-screen">
      <div className="flex-1 flex flex-col  bg-slate-50  w-[350px]  shadow">
        <div className="my-8 flex ml-4  items-center ">
          {/* <Avatar name={user?.name} size="50" round={true} /> */}
          <p className="ml-4 font-semibold">{user?.name}</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col mt-8 gap-2 cursor-pointer">
            {routes.map((path, i) => (
              <Link to={path.link} key={i}>
                <div
                  className={`flex items-center p-4 ${
                    location.pathname === path.link
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  } `}
                >
                  <div className="mx-4">{path.icon}</div>
                  <p className="text-lg font-normal">{path.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-300 mb-4">
            <Logout
              name={"Logout"}
              handleClick={() => {
                auth?.logout();
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
