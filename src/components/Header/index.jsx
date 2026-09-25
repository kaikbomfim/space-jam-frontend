import { Plus } from "lucide-react";
import Button from "../Button";

const Header = ({
  title,
  description,
  count,
  addLabel = "Novo cadastro",
  onAddClick,
  children,
}) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-2.5">
        {count !== undefined && (
          <span className="text-[13px] font-bold tracking-[2px] text-nebula">
            COLEÇÃO · {count} {count === 1 ? "REGISTRO" : "REGISTROS"}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-[44px]">
          {title}
        </h1>
        {description && (
          <p className="text-[17px] text-muted">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {children}
        <Button size="lg" icon={Plus} onClick={onAddClick}>
          {addLabel}
        </Button>
      </div>
    </div>
  );
};

export default Header;
