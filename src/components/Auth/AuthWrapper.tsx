import logo from "../../assets/logo.svg";
export const AuthWrapper = ({
  children,

  title,
  subTitle,
}: {
  children: JSX.Element;

  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex items-center justify-evenly  h-screen bg-white">
      <div className="w-full lg:w-[50%] h-full flex flex-col justify-between pt-36 pb-20 items-center px-10">
        <div>
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="mr-1 md:mr-3 w-[60px] md:w-full"
            />
          </div>
          <div className="mt-0 md:mt-1  mr-1 md:mr-2  float-right w-12 md:w-28 h-[2px] md:h-1 bg-[#5FA5F8]" />
        </div>
        <div className="flex flex-col mb-20 justify-center items-center">
          <h3 className="text-xl md:text-5xl">
            <strong>{title}</strong>
          </h3>
          <p className="text-xs md:text-lg text-center  text-gray-400 mt-4  font-semibold">
            {subTitle}
          </p>
          <div className="flex justify-between mt-8 w-full">{children}</div>
        </div>
        <div>
          <p>
            <small>© Marquee Equity, 2016-2023. All Rights Reserved.</small>
          </p>
        </div>
      </div>
    </div>
  );
};
