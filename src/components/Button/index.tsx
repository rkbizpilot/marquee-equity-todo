import React from "react";

const baseClass =
  "inline-flex justify-center items-center p-[12px] border text-sm leading-4 font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-500";

const solidBaseClass =
  "border border-transparent hover:shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2";

type Colors = "primary" | "secondary";

type ButtonTypes = `solid ${Colors}`;

const buttonTypeClasses: Record<ButtonTypes, string> = {
  "solid primary": `${solidBaseClass} shadow-sm text-white bg-blue-600  focus:ring-blue-600`,
  "solid secondary": `${solidBaseClass} shadow-sm text-white bg-black hover:bg-gray-700 focus:ring-black-500`
};

type Props = {
  className?: string;
  color?: Colors;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className = "",
  color = "primary",
  ...rest
}: Props) => {
  const buttonType: ButtonTypes = `solid ${color}`;
  const buttonClassname = buttonTypeClasses[buttonType];

  return (
    <button
      className={`${baseClass} ${buttonClassname} ${className}`}
      {...rest}
    />
  );
};
