import { CircleAlert, CircleCheck, X } from "lucide-react";
import {
  TOAST_ICON_COLORS,
  TOAST_VARIANTS,
} from "../../constants/styles/toast";

const TOAST_ICONS = {
  success: CircleCheck,
  danger: CircleAlert,
};

const Toast = ({ variant = "success", message, onClose }) => {
  const Icon = TOAST_ICONS[variant];

  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-ink-soft shadow-2xl shadow-black/50 motion-safe:animate-toast-in ${TOAST_VARIANTS[variant]}`}
    >
      <Icon
        size={20}
        className={`mt-0.5 shrink-0 ${TOAST_ICON_COLORS[variant]}`}
      />
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="-m-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
