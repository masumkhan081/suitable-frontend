
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
      "outline-none p-[5px] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
  },
  authForm: {
    parent: "flex flex-col gap-[3px] w-full",
    label: "font-medium text-gray-500 dark:text-gray-400",
    input:
      "flex-grow outline-none px-[10px] py-[8px] text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400",
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
      <div className="flex w-full rounded-md border focus-within:border-gray-400 hover:border-gray-400 border-gray-200 bg-white dark:bg-gray-800 transition-colors">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`${styMap[styleKey]?.input} w-full bg-white ${isPassword ? "pr-2" : ""
            }`}
          style={{
            backgroundColor: 'white',
            WebkitBoxShadow: '0 0 0 1000px white inset',
            WebkitTextFillColor: 'currentColor'
          }}
          placeholder={ph}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            className="flex items-center justify-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
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
