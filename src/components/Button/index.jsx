import { Link } from "react-router-dom";
import {
  BUTTON_BASE,
  BUTTON_ICON_SIZES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "../../constants/styles/button";

const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  to,
  className = "",
  children,
  ...props
}) => {
  const classes = `${BUTTON_BASE} ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon size={BUTTON_ICON_SIZES[size]} strokeWidth={2.2} />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
