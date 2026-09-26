import { useCallback, useMemo, useRef, useState } from "react";
import Toast from "../Toast";
import { ToastContext } from "../../hooks/useToast";
import { TOAST_DURATION } from "../../constants/toast";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (variant, message) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, variant, message }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      success: (message) => show("success", message),
      error: (message) => show("danger", message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-60 flex flex-col gap-3 sm:left-auto sm:w-96">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            message={toast.message}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
