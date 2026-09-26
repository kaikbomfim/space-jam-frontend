import { ChevronDown, ListFilter } from "lucide-react";

const SelectFilter = ({ label, options, value, onChange }) => {
  return (
    <div className="relative h-12 w-full rounded-[14px] border border-space-500 bg-space-850 text-muted transition-colors focus-within:border-nebula sm:w-90">
      <ListFilter
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-full w-full cursor-pointer appearance-none bg-transparent pr-11 pl-11.5 text-[15px] text-ink outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-space-850">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        aria-hidden="true"
      />
    </div>
  );
};

export default SelectFilter;
