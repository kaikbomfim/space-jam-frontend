import { Plus } from "lucide-react";

const PageHeader = ({ title, icon: Icon, onAddClick }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Icon size={24} />
          </div>
        )}
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">{title}</h1>
      </div>
      <button
        onClick={onAddClick}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        style={{ cursor: "pointer" }}
      >
        <Plus size={16} />
        Novo cadastro
      </button>
    </div>
  );
};

export default PageHeader;
