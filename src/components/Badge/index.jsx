import { BADGE_SHAPES, BADGE_VARIANTS } from "../../constants/styles/badge";

const Badge = ({ variant = "neutral", shape = "status", children }) => {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full ${BADGE_SHAPES[shape]} ${BADGE_VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
