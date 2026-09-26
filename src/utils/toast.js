import { DEFAULT_ERROR_MESSAGE } from "../constants/toast";

export const getErrorMessage = (error) => {
  return error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE;
};
