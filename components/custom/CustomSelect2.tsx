import { ArrowDown2 } from "iconsax-react";
import  { useState,  useEffect, useRef } from "react";

interface CustomSelectProps {
  options: string[]; // Array of strings for the options
  label?: string;
  value: string; // Single string representing the selected value
  onChange: (selectedValue: string) => void; // Function to handle change
  placeholder?: string; // Placeholder text when no option is selected
  keyStyParent?: keyof typeof styMap; // Key to access styles from styMap
}

const styMap = {
  default: {
    parent: "flex flex-col gap-1 w-full relative",
    inlineLabel:
      "bg-slate-300 text-black text-sm font-semibold px-0.5 rounded-md py-0.125 h-full",
    label: "w-full text-[#333333]",
    value:
      "flex ps-1 pe-2 justify-between items-center w-full outline-none bg-[#FFFFFF] p-[10px] rounded-md border border-gray-300",
    dropdown:
      "absolute w-full bg-white z-10 top-full border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto",
    option:
      "py-2 px-3 text-sm cursor-pointer hover:bg-blue-600 hover:text-white",
    optionSelected: "bg-blue-600 text-white",
  },
  piCreation: {
    parent: "flex flex-col gap-1 w-full relative",
    inlineLabel:
      "bg-blue-900 text-white text-sm font-semibold px-0.5 rounded-md py-0.125 h-full",
    label: "w-full text-[#FFFFFF]",
    value:
      "flex ps-1 pe-2 justify-between items-center w-full outline-none bg-[#FFFFFFB2] p-[10px] rounded-md border border-gray-300",
    dropdown:
      "absolute w-full z-10 top-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto",
    option:
      "py-2 px-3 text-sm cursor-pointer hover:bg-blue-600 hover:text-white",
    optionSelected: "bg-blue-600 text-white",
  },
};

export default function CustomSelect({
  options,
  label,
  value,
  onChange,
  placeholder = "Select an option",
  keyStyParent = "default", // Default to "default" if not provided
}: CustomSelectProps) {
  //
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 
  //
  const handleSelectToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className={styMap[keyStyParent].parent}>
      {label && <label className={styMap[keyStyParent].label}>{label}</label>}

      <div
        className={styMap[keyStyParent].value}
        onClick={handleSelectToggle} // Open/close the dropdown on click
      >
        <span>{value || placeholder}</span>
        <ArrowDown2 size="18" className="text-slate-600 me-2 " />
      </div>

      {isOpen && (
        <ul className={styMap[keyStyParent].dropdown}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styMap[keyStyParent].option} ${
                value === option ? styMap[keyStyParent].optionSelected : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
