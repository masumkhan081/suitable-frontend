import React from "react";

const CustomRadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  styleKey = "default",
}) => {
  const styleMap = {
    default: {
      parent: "flex gap-4",
      label: "ml-2 text-sm text-gray-700",
      input:
        "focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded",
      radio: "ml-2 text-sm text-gray-700",
    },
    authForm: {
      parent: "flex flex-col gap-2",
      label: "font-semibold text-gray-600",
      input:
        "focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded",
      radio: "ml-2 text-sm text-gray-700 ",
    },
  };

  return (
    <div className={styleMap[styleKey].parent}>
      <p className={styleMap[styleKey].label}>{label}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              id={option}
              type="radio"
              name={name}
              value={option}
              required
              className={styleMap[styleKey].input}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={option} className={styleMap[styleKey].radio}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioGroup;
