import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder, onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex h-12 w-full items-center gap-2.5 rounded-[14px] border border-space-500 bg-space-850 pl-4 pr-1.5 text-muted transition-colors focus-within:border-nebula sm:w-90"
    >
      <Search size={18} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        aria-label={placeholder || "Buscar"}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder-muted outline-none"
      />
      <button
        type="submit"
        className="h-9 shrink-0 rounded-[10px] bg-space-800 px-3.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-space-500 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
