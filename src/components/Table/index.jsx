import ActionButtons from "../ActionButtons";

const TableHeader = ({ children }) => {
  return (
    <thead className="border-b border-space-500">
      <tr>{children}</tr>
    </thead>
  );
};

const TableHeadCell = ({ children, className = "" }) => {
  return (
    <th
      className={`px-4 py-3.5 text-xs font-bold uppercase tracking-[1.2px] text-muted ${className}`}
    >
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tbody className="divide-y divide-space-700">{children}</tbody>;
};

const TableRow = ({ children, className = "" }) => {
  return (
    <tr className={`transition-colors hover:bg-space-800/50 ${className}`}>
      {children}
    </tr>
  );
};

const TableCell = ({ children, colSpan, className = "" }) => {
  return (
    <td colSpan={colSpan} className={`px-4 py-3.5 text-[15px] ${className}`}>
      {children}
    </td>
  );
};

const Table = ({ children }) => {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-space-500 bg-space-850">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left">{children}</table>
      </div>
    </div>
  );
};

Table.Header = TableHeader;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Actions = ActionButtons;

export default Table;
