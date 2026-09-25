import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavbarLink from "../NavbarLink";

const Navbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">SpaceJam</div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 hover:text-gray-300 transition-colors"
          style={{ cursor: "pointer" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <NavbarLink key={link.path} to={link.path}>
              {link.label}
            </NavbarLink>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          {links.map((link) => (
            <div key={link.path} onClick={() => setIsOpen(false)}>
              <NavbarLink to={link.path}>{link.label}</NavbarLink>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
