import { NavLink } from "react-router-dom";

const NavbarLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-colors ${
          isActive
            ? "text-blue-400 font-semibold"
            : "text-white hover:text-gray-300"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
