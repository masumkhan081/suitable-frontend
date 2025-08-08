
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  ph?: string;
  styleKey?: keyof typeof styMap;
  required?: boolean;
  value?: string | number;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const styMap = {
  default: {
    parent: "",
    label: "flex flex-col gap-[3px] w-full",
    input:
      "rounded-md  border border-gray-300 outline-none focus:border-gray-400 hover:border-gray-500 p-[5px] space-x-2",
  },
  authForm: {
    parent: "flex flex-col gap-[3px] w-full",
    label: "font-medium text-gray-500",
    input:
      "flex-grow text-gray-800 outline-none !rounded-md focus:border-gray-400 hover:border-gray-500 px-[10px] py-[8px] space-x-2",
  },
};

export default function CustomInput({
  id = "",
  label,
  name,
  type = "text",
  ph,
  styleKey = "default",
  required = false,
  value = "",
  readOnly = false,
  onChange,
  error,
}: InputProps) {
  //
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={styMap[styleKey]?.parent}>
      {label && <label className={styMap[styleKey]?.label}>{label}</label>}
      <div className="flex w-full rounded-md border focus:border-gray-400 hover:border-gray-400  hover:bg-gray-50 border-gray-200">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`${styMap[styleKey]?.input} w-full ${isPassword ? "pr-10" : ""
            }`}
          placeholder={ph}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            className="flex items-center  pe-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <Eye className="w-5 h-5  " />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
