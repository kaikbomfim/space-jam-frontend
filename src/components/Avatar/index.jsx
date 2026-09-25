import {
  AVATAR_ICON_SIZES,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
} from "../../constants/styles/avatar";
import { getInitials } from "../../utils/format";

const Avatar = ({ name, icon: Icon, variant = "neutral", size = "sm" }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-bold ${AVATAR_SIZES[size]} ${AVATAR_VARIANTS[variant]}`}
    >
      {Icon ? (
        <Icon size={AVATAR_ICON_SIZES[size]} strokeWidth={1.8} />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export default Avatar;
