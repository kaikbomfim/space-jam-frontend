import { Edit2, Trash2 } from "lucide-react";

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-end gap-1">
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] text-nebula transition-colors hover:bg-nebula-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula"
          title="Editar"
          aria-label="Editar"
        >
          <Edit2 size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] text-danger transition-colors hover:bg-danger-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          title="Excluir"
          aria-label="Excluir"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
