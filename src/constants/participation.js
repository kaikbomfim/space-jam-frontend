import { EMPTY_STATS } from "./player";

export const EMPTY_PAYMENT = {
  completed: false,
  amount_paid: "",
  payment_date: "",
};

export const EMPTY_PARTICIPATION_FORM = {
  game_id: "",
  team_id: "",
  player_id: "",
  confirmation_date: "",
  payment: EMPTY_PAYMENT,
  match_stats: EMPTY_STATS,
};

export const TEAM_FILTER_ALL = { value: "", label: "Todos os times" };

export const PARTICIPATION_TOAST_MESSAGES = {
  create: "Participação criada com sucesso",
  update: "Participação atualizada com sucesso",
  delete: "Participação excluída com sucesso",
};
