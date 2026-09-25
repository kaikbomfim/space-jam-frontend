import { NavLink } from "react-router-dom";

const NavbarLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex h-11 items-center gap-2 rounded-full px-5 text-[15px] transition-colors ${
          isActive
            ? "bg-flame font-bold text-space-950"
            : "font-medium text-ink-soft hover:bg-space-800 hover:text-ink"
        }`
      }
    >
      {Icon && <Icon size={18} strokeWidth={1.8} aria-hidden="true" />}
      <span>{children}</span>
    </NavLink>
  );
};

export default NavbarLink;
