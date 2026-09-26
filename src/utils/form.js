import { BLOCKED_NUMBER_KEYS } from "../constants/form";

export const preventInvalidNumberKeys = (e) => {
  if (BLOCKED_NUMBER_KEYS.includes(e.key)) {
    e.preventDefault();
  }
};

export const sanitizePositiveDecimal = (raw) => {
  const [integer, ...decimals] = raw.replace(/[^0-9.]/g, "").split(".");
  return decimals.length > 0
    ? `${integer}.${decimals.join("").slice(0, 2)}`
    : integer;
};

export const toSelectOptions = (items, getLabel) => {
  return items.map((item) => ({ value: item._id, label: getLabel(item) }));
};
