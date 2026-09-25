import { Trash2, AlertTriangle } from "lucide-react";
import Modal from "../Modal";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  resourceName,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Header title={title} onClose={onClose} />

      <Modal.Body>
        <div className="flex items-start gap-3 rounded-md bg-red-50 p-4 text-red-800 border border-red-100">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red-600" />
          <p className="text-sm">
            Tem certeza de que deseja excluir <strong>{resourceName}</strong>?
            Esta ação é permanente e não poderá ser desfeita.
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
