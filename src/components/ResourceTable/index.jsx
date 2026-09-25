import { Edit2, Trash2 } from "lucide-react";

const TableHeader = ({ children }) => {
  return (
    <thead className="border-b border-gray-200 bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
};

const TableHeadCell = ({ children, className = "" }) => {
  return (
    <th
      className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
};

const TableRow = ({ children, className = "" }) => {
  return (
    <tr className={`transition-colors hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
};

const TableCell = ({ children, className = "" }) => {
  return (
    <td className={`px-6 py-4 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
};

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-end gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-md p-1.5 text-blue-600 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Editar"
        >
          <Edit2 size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Excluir"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

const ResourceTable = ({ children }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm">
          {children}
        </table>
      </div>
    </div>
  );
};

ResourceTable.Header = TableHeader;
ResourceTable.HeadCell = TableHeadCell;
ResourceTable.Body = TableBody;
ResourceTable.Row = TableRow;
ResourceTable.Cell = TableCell;
ResourceTable.Actions = TableActions;

export default ResourceTable;
