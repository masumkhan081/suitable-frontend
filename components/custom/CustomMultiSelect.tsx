import { useState, useRef, useEffect } from "react";
import { ArrowDown2, CloseSquare } from "iconsax-react";
import CustomCheckIcon from "../../public/custom-icons/CustomCheckIcon";
//
const styleMap = {
  default: {
    label: "text-[#3B3D5E] text-sm capitalize",
    parent: "",
    li: "",
    chip: "",
    count: "",
  },
  filterModal: {
    label: "text-leading_3 text-[13px] font-semibold text-default-500",
  },
  createUser: {
    label: " text-[#3B3D5E] text-sm capitalize",
  },
};
type OptionType = Record<string, string | number> ;

interface CustomSelectProps {
  options: OptionType[];
  label?: string;
  selectedValues: OptionType[] | []; 
  valueKey: string;
  idKey: string;
  selectionHandler: (value: OptionType) => void;
  isJointValues?: boolean;
  maxPopupHeight?: string;
  isCount?: boolean;
  isChip?: boolean;
  styleKey?: keyof typeof styleMap;
  ph?: string;
  inlineLabel?: string;
  error?: string | null;
}

const CustomMultiSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  selectedValues,
  valueKey,
  idKey = "id",
  selectionHandler,
  styleKey = "default",
  maxPopupHeight = " max-h-[200px] ",
  isCount = false,
  isChip = true,
  ph,
  error,
}) => {
  //
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();
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

  // const isObjectOptions = typeof options[0] === "object" && options[0].hasOwnProperty(valueKey);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  

  return (
    <div className="flex flex-col justify-between gap-[5px] max-h-full my-0 py-0 w-full ">
      {label && (
        <label className={`${styleMap[styleKey]?.label}`}>{label}</label>
      )}
      <div className="flex-grow relative mb-0 pb-0" ref={dropdownRef}>
        <div
          className={`py-[10px] px-2 min-w-[100px] h-full outline-none rounded-lg cursor-pointer flex justify-between items-center border border-gray-300 focus:border-gray-400 hover:border-gray-500`}
          onClick={toggleDropdown}
        >
          <span className="text-sm text-slate-900 overflow-hidden whitespace-nowrap text-ellipsis">
            {selectedValues?.length > 0 ? (
              <span className="flex items-center gap-1">
                {isCount && (
                  <span className="rounded-full py-[2px] font-bold px-2 me-1 border border-slate-300 text-[#FF8A65]">
                    {selectedValues.length}
                  </span>
                )}
                <span>
                  {selectedValues?.map((item) => item[valueKey]).join(", ")}
                </span>
              </span>
            ) : (
              <span className="text-slate-800 text-sm">{ph}</span>
            )}
          </span>

          {isOpen && <ArrowDown2 size="14" className="text-slate-600 mx-2" />}

          {!isOpen && (
            <ArrowDown2 size="14" className="text-slate-600 mx-2 -rotate-90" />
          )}
        </div>

        {isOpen && options?.length > 0 && (
          <ul
            className={`absolute mb-2 space-y-1 px-1 py-2 w-full z-50 top-full text-black border-slate-200 rounded-md shadow-md overflow-y-auto scrollbar bg-white scroll 
              ${maxPopupHeight} custom-scrollbar`}
          >
            {options.map((option, index) => (
              <li
                key={option[idKey] || index}
                className={`bg-white border-2 border-transparent hover:border-blue-400 text-black   text-sm cursor-pointer rounded-xl hover:bg-[#363856] hover:text-white`}
                onClick={() => {
                  selectionHandler(option); // Call selectionHandler to add/remove
                }}
              >
                <p className="py-[6px] px-2 rounded-xl flex justify-between items-center h-full w-full hover:border-white border-2 border-transparent transition-all duration-200">
                  {option[valueKey]}
                  {/* {JSON.stringify(option)} */}
                  {selectedValues?.some(
                    (val) => val[idKey] === option[idKey]
                  ) && <CustomCheckIcon />}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isChip && selectedValues?.length > 0 && (
        <div className="flex gap-2 items-center flex-wrap">
          {selectedValues?.map((selected, index) => (
            <span
              key={index}
              className="flex justify-between gap-1 px-[2px] items-center border border-slate-300 text-slate-900 font-medium text-xs rounded-md "
            >
              <span className="ps-[3px]">{selected?.[valueKey]} </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  selectionHandler(selected);
                }}
              >
                <CloseSquare
                  className="w-5 h-5 rounded-full"
                  variant="Bulk"
                  color="#FF8A65"
                />
              </button>
            </span>
          ))}
        </div>
      )}
      {isOpen === false && error && (
        <span className="text-red-600 text-xs px-1">{error}</span>
      )}
    </div>
  );
};

export default CustomMultiSelect;
