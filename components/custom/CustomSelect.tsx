import { useState, useRef, useEffect, ReactNode } from "react";
import { ArrowDown2 } from "iconsax-react";
import CustomCheckIcon from "../../public/custom-icons/CustomCheckIcon";

type OptionType = Record<string, string | number>;

interface CustomSelectProps {
  options: OptionType[];
  label?: string;
  value: OptionType | null;
  idKey: string;
  valueKey: string;
  maxPopupHeight?: string;
  onChange: (value: OptionType) => void;
  bg?: "light" | "blue";
  ph: string;
  icon?: ReactNode;
  inlineLabel?: string;
  error?: string | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  value,
  idKey = "id",
  valueKey,
  onChange,
  maxPopupHeight = " max-h-[300px] ",
  ph,
  // bg,
  // icon,
  // inlineLabel,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // const styles: Record<string, string> = {
  //   light: "bg-white text-black border border-slate-200 hover:border-slate-500",
  //   blue: "bg-blue-700 text-white",
  // };

  return (
    <div className=" flex flex-col gap-1 max-h-full min-h-full my-0 w-full">
      {label && (
        <label className="text-[#3B3D5E] text-sm ps-[1px]">{label}</label>
      )}
      <div className="relative max-h-full min-h-full   my-0" ref={dropdownRef}>
        <div
          className={`py-[10px] px-2 min-w-[100px] h-12 outline-none  rounded-md capitalize cursor-pointer flex justify-between items-center border border-slate-200`}
          onClick={toggleDropdown}
        >
          {/* {inlineLabel && (
            <span
              className={
                bg === "blue"
                  ? "bg-blue-900 text-white text-sm font-semibold px-0.5 h-full rounded-md py-0.125"
                  : "bg-slate-300 text-black text-sm font-semibold px-0.5 rounded-md py-0.125 h-full"
              }
            >
              {inlineLabel}
            </span>
          )} */}
          {/* {icon && icon} */}
          <span className="text-sm  text-slate-900">
            {value?.[valueKey] || ph}
          </span>
          <ArrowDown2 size="14" className="text-slate-600 mx-2 " />
        </div>

        {isOpen && options?.length > 0 && (
          <ul
            style={{ zIndex: "10000" }}
            className={`absolute space-y-1 px-1 py-2 z-50 w-full top-full text-black border border-slate-200 rounded-md shadow-md overflow-y-auto scrollbar bg-white  ${maxPopupHeight}`}
          >
            {options?.map((option, index) => (
              <li
                key={index}
                className={` bg-white border-2 border-transparent hover:border-blue-400 text-black capitalize text-sm  cursor-pointer rounded-xl hover:bg-[#363856] hover:text-white`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <p className="py-[6px] px-2 rounded-xl flex justify-between items-center h-full w-full hover:border-white border-2 border-transparent transition-all duration-200">
                  {option?.[valueKey]}

                  {value?.[idKey] === option?.[idKey] && <CustomCheckIcon />}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen === false && error && (
        <span className="text-red-600 text-xs p-1">{error}</span>
      )}
    </div>
  );
};

export default CustomSelect;
