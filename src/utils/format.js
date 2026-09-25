export const normalize = (value) => {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
};

export const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getInitials = (name) => {
  return (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatCurrency = (value) => {
  return Number(value ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const formatTime = (value) => {
  return new Date(value).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatSchedule = (start, end) => {
  const startDate = new Date(start);
  const weekday = capitalize(
    startDate.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
  );

  return `${weekday} · ${formatTime(start)} – ${formatTime(end)} · ${startDate.getFullYear()}`;
};

export const toDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};
