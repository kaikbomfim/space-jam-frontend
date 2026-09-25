import { Save } from "lucide-react";
import Modal from "../Modal";
import Button from "../Button";

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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" icon={Save}>
            {isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormModal;
