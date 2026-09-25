import { Trash2, AlertTriangle } from "lucide-react";
import Modal from "../Modal";
import Button from "../Button";

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
        <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-dim p-4 text-ink-soft">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
          <p className="text-sm leading-relaxed">
            Tem certeza de que deseja excluir{" "}
            <strong className="text-ink">{resourceName}</strong>? Esta ação é
            permanente e não poderá ser desfeita.
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" icon={Trash2} onClick={onConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
