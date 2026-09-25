import { X } from "lucide-react";

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-space-500 px-6 py-5">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-9 w-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-space-800 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-space-500 bg-space-900 px-6 py-4">
      {children}
    </div>
  );
};

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg overflow-hidden rounded-[20px] border border-space-500 bg-space-850 text-ink shadow-2xl shadow-black/50"
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
