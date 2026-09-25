export const BUTTON_BASE =
  "flex shrink-0 items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2";

export const BUTTON_VARIANTS = {
  primary:
    "bg-flame font-bold text-space-950 hover:bg-flame-soft focus-visible:ring-flame-pale",
  secondary:
    "border border-space-500 font-semibold text-ink-soft hover:bg-space-800 hover:text-ink focus-visible:ring-nebula",
  danger:
    "bg-danger font-bold text-space-950 hover:bg-danger/85 focus-visible:ring-danger",
};

export const BUTTON_SIZES = {
  md: "h-11 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-[14px] px-5.5 text-[15px]",
};

export const BUTTON_ICON_SIZES = {
  md: 16,
  lg: 18,
};
