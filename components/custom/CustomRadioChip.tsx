interface propsType {
  optionText: string;
  groupName: string;
  value: string;
  checkedValue?: string | null;
  onSelect?: (value: string) => void;
}

export default function CustomRadioChip({
  optionText,
  groupName,
  value,
  checkedValue,
  onSelect,
}: propsType) {
  const getStyle = (checked: boolean) =>
    checked
      ? " text-blue-700 flex items-center rounded-2xl border space-x-1 bg-blue-100 border-blue-500 px-2"
      : "flex items-center rounded-2xl border space-x-1 bg-blue-50 border-blue-300 px-2";

  return (
    <label className={getStyle(checkedValue === value)}>
      <span className="whitespace-nowrap">{optionText}</span>
      <input
        type="radio"
        name={groupName}
        value={value}
        className="w-4 h-4"
        checked={checkedValue === value}
        onClick={() => {
          onSelect?.(value);
        }}
        // onChange={() => {
        //   onSelect?.(value);
        // }}
      />
    </label>
  );
}
