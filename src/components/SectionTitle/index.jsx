import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectionTitle = ({ title, to, linkLabel = "Ver todos" }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
      {to && (
        <Link
          to={to}
          className="flex items-center gap-1.5 text-sm font-semibold text-flame-soft transition-colors hover:text-flame-pale"
        >
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
