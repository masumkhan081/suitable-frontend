import React, { MouseEventHandler, FormEventHandler, ReactNode } from "react";

// Define the type for style keys
export type ButtonStyleKey = "default" | "authForm";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  txt?: string;
  isDisabled?: boolean;
  startIcon?: ReactNode;
  styleKey?: ButtonStyleKey;
  endIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  txt,
  styleKey = "default",
  startIcon,
  endIcon,
  isDisabled = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  //
  const styleMap = {
    default: "text-blue-600 bg-blue-50 rounded-md p-2 font-bold",
    authForm: `w-full text-white  border border-gray-300 rounded-md bg-purple-600 text-center px-2 py-2 font-semibold`,
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      title={isDisabled ? "Disabled" : ""}
      onClick={onClick}
      className={`${styleMap[styleKey]} !rounded-md`}
    >
      {startIcon}
      {txt}
      {endIcon}
    </button>
  );
}
