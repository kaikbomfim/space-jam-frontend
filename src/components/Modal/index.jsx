import { X } from "lucide-react";

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="px-6 py-4">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
      {children}
    </div>
  );
};

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
