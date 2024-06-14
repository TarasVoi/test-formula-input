import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick: () => void;
  title: string;
  className?: string;
};

export const Button: FC<Props> = ({ onClick, title, className }) => {
  return (
    <button
      className={twMerge(
        "p-2 px-5 font-bold  bg-blue-500 text-white",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
