import { ArrowDown2, TickCircle } from "iconsax-react";
import { useState, useEffect, useRef } from "react";

type OptionType = string | { value: string; label: string };

interface CustomSelectProps {
  options: OptionType[];
  label?: string;
  value: string;
  onChange: (selectedValue: string) => void;
  placeholder?: string;
  keyStyParent?: keyof typeof styMap;
}

const styMap = {
  default: {
    parent: "flex flex-col gap-1 w-full relative",
    inlineLabel: "bg-slate-300 text-black text-sm font-semibold px-0.5 rounded-md py-0.125 h-full",
    label: "w-full text-gray-700",
    value: "flex ps-3 pe-2 justify-between items-center w-full outline-none bg-white p-2.5 rounded-md border border-gray-300 hover:border-gray-400 transition-colors",
    dropdown: "absolute w-full bg-white z-10 top-full border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto p-1 space-y-1",
    option: "py-2 px-3 mx-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-2 rounded-md border border-transparent hover:border-gray-200",
    optionSelected: "bg-gray-100 font-medium text-gray-900 border-gray-200",
  },
  piCreation: {
    parent: "flex flex-col gap-1 w-full relative",
    inlineLabel: "bg-blue-900 text-white text-sm font-semibold px-0.5 rounded-md py-0.125 h-full",
    label: "w-full text-white",
    value: "flex ps-3 pe-2 justify-between items-center w-full outline-none bg-white/70 p-2.5 rounded-md border border-gray-300 hover:border-gray-400 transition-colors",
    dropdown: "absolute w-full bg-white z-10 top-full border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto py-1 px-2 space-y-1",
    option: "py-2 px-3 mx-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-2 rounded-md border border-transparent hover:border-gray-200 transition-colors",
    optionSelected: "bg-gray-100 font-medium text-gray-900 border-gray-200",
  },
};

export default function CustomSelect({
  options,
  label,
  value,
  onChange,
  placeholder = "Select an option",
  keyStyParent = "default",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styMap[keyStyParent].parent} ref={dropdownRef}>
      {label && <label className={styMap[keyStyParent].label}>{label}</label>}
      <div
        className={`${styMap[keyStyParent].value} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'text-gray-400' : ''}>
          {value || placeholder}
        </span>
        <div className="flex items-center">
          <span className="text-gray-400 mr-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className={styMap[keyStyParent].dropdown}>
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            const isSelected = value === optionValue;
            
            return (
              <div
                key={optionValue}
                className={`${styMap[keyStyParent].option} ${
                  isSelected ? styMap[keyStyParent].optionSelected : ""
                }`}
                onClick={() => handleOptionSelect(optionValue)}
              >
                <span className="flex-grow">
                  {optionLabel}
                </span>
                {isSelected && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
