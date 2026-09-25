const FilterChips = ({ label, options, value, onChange }) => {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`h-10 rounded-full px-4.5 text-sm transition-colors ${
              isActive
                ? "bg-ink font-bold text-space-950"
                : "border border-space-500 font-semibold text-ink-soft hover:bg-space-800"
            }`}
          >
            {option.label}
            {option.count !== undefined && ` · ${option.count}`}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
