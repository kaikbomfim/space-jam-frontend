import { DEFAULT_ERROR_MESSAGE, TOAST_DURATION } from "../constants/toast";

let toasts = [];
let nextId = 0;
const listeners = new Set();

const emit = () => {
  listeners.forEach((listener) => listener(toasts));
};

const show = (variant, message) => {
  const id = nextId++;
  toasts = [...toasts, { id, variant, message }];
  emit();
  setTimeout(() => dismissToast(id), TOAST_DURATION);
};

export const dismissToast = (id) => {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
};

export const subscribeToasts = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const toast = {
  success: (message) => show("success", message),
  error: (message) => show("danger", message),
};

export const getErrorMessage = (error) => {
  return error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE;
};
