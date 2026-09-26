import Avatar from "../Avatar";
import {
  HIGHLIGHT_VALUE_COLORS,
  HIGHLIGHT_VALUE_SIZES,
} from "../../constants/styles/highlightCard";

const HighlightCard = ({
  label,
  title,
  value,
  unit,
  avatarName,
  icon,
  variant = "neutral",
  valueSize = "lg",
}) => {
  return (
    <div className="flex items-center gap-5 rounded-[20px] border border-space-500 bg-space-850 p-6">
      <Avatar name={avatarName} icon={icon} variant={variant} size="lg" />
      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex max-w-full shrink-0 flex-col gap-0.5">
          <span className="whitespace-nowrap text-xs font-bold tracking-[1.5px] text-muted">
            {label}
          </span>
          <span className="truncate text-[17px] font-bold">{title}</span>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`whitespace-nowrap font-display font-bold ${HIGHLIGHT_VALUE_SIZES[valueSize]} ${HIGHLIGHT_VALUE_COLORS[variant]}`}
          >
            {value}
          </span>
          {unit && <span className="text-xs text-muted">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
