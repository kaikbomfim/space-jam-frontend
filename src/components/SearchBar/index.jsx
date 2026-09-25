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
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder || "Buscar..."}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{ cursor: "pointer" }}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
