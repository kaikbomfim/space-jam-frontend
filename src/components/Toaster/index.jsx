import { useEffect, useState } from "react";
import Toast from "../Toast";
import { dismissToast, subscribeToasts } from "../../utils/toast";

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => subscribeToasts(setToasts), []);

  return (
    <div className="fixed inset-x-4 bottom-4 z-60 flex flex-col gap-3 sm:left-auto sm:w-96">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          onClose={() => dismissToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toaster;
