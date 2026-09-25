import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../Logo";
import NavbarLink from "../NavbarLink";

const Navbar = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-space-600 bg-space-950/95 backdrop-blur">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="SpaceJam — início">
          <Logo />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-space-500 text-ink-soft transition-colors hover:text-ink lg:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden shrink-0 gap-1 rounded-full border border-space-500 bg-space-850 p-1 lg:flex">
          {routes.map((route) => (
            <NavbarLink key={route.path} to={route.path} icon={route.icon}>
              {route.label}
            </NavbarLink>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-1 border-t border-space-600 px-4 py-3 sm:px-6 lg:hidden">
          {routes.map((route) => (
            <div key={route.path} onClick={() => setIsOpen(false)}>
              <NavbarLink to={route.path} icon={route.icon}>
                {route.label}
              </NavbarLink>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
