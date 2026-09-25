export const GAME_STATUS_OPTIONS = [
  { value: "aberto", label: "Aberto" },
  { value: "encerrado", label: "Encerrado" },
];

export const GAME_STATUS_FILTERS = [
  { value: "", label: "Todos" },
  { value: "aberto", label: "Abertos" },
  { value: "encerrado", label: "Encerrados" },
];

export const GAME_STATUS_BADGE_VARIANTS = {
  aberto: "success",
  encerrado: "neutral",
};

export const EMPTY_GAME_FORM = {
  location: "",
  status: "aberto",
  start_date: "",
  end_date: "",
  total_value: "",
  player_limit_min: "",
  player_limit_max: "",
};
