import React from "react";
type ButtonVariant = "primary" | "secondary" | "accent";
interface BaseBtnProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  children?: React.ReactNode;
}
export default function BaseBtn({ disabled, children, variant='primary' }: BaseBtnProps) {
  const variantClass =
    variant === "primary"
      ? "bg-primary-600 text-white hover:bg-primary-700"
      : variant === "secondary"
      ? "ring-1 ring-primary-600 text-primary-600"
      : "bg-red-500 text-white hover:bg-accent-700";

  return (
    <>
      <button
        disabled={disabled}
        className={`${variantClass} ${disabled ? 'opacity-75 ' : ''} flex justify-center items-center  rounded-lg px-4 py-2 text-sm font-medium `}
      >
        {children}
      </button>
    </>
  );
}