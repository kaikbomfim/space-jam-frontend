import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export const useToast = () => {
  return useContext(ToastContext);
};
