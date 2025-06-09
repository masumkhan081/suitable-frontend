import Link from "next/link";
import { ArrowLeft, ArrowRight } from "iconsax-react";

interface CustomLinkProps {
  txt: string;
  startIcon?: boolean;
  endIcon?: boolean;
  href: string;
  styleKey?: "default" | "authForm";
}

const styleMap = {
  default: "text-blue-600",
  authForm: "bg-slate-200  text-white rounded-md text-center px-2 py-2 font-semibold  ",
};

export default function CustomLink({
  txt,
  startIcon,
  endIcon,
  href,
  styleKey = "default",
}: CustomLinkProps) {
  return (
    <Link
      href={href}
      className={styleMap[styleKey]}
    >
      {startIcon && <ArrowLeft size="22" />}
      {txt}
      {endIcon && <ArrowRight size="22" />}
    </Link>
  );
}
