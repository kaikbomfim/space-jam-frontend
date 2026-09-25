import Avatar from "../Avatar";
import { HIGHLIGHT_VALUE_COLORS } from "../../constants/styles/highlightCard";

const HighlightCard = ({
  label,
  title,
  value,
  unit,
  avatarName,
  icon,
  variant = "neutral",
}) => {
  return (
    <div className="flex items-center gap-5 rounded-[20px] border border-space-500 bg-space-850 p-6">
      <Avatar name={avatarName} icon={icon} variant={variant} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-xs font-bold tracking-[1.5px] text-muted">
          {label}
        </span>
        <span className="truncate text-[17px] font-bold">{title}</span>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`font-display text-3xl font-bold ${HIGHLIGHT_VALUE_COLORS[variant]}`}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-muted">{unit}</span>}
      </div>
    </div>
  );
};

export default HighlightCard;
