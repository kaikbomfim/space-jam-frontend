import { Save } from "lucide-react";
import Modal from "../Modal";

const FormModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  isEditing = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <Modal.Header title={title} onClose={onClose} />

        <Modal.Body>
          <div className="flex flex-col gap-4">{children}</div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save size={16} />
            {isEditing ? "Atualizar" : "Salvar"}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormModal;
