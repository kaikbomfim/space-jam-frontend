import {
  EMPTY_PARTICIPATION_FORM,
  EMPTY_PAYMENT,
} from "../constants/participation";
import { EMPTY_STATS, STAT_FIELDS } from "../constants/player";
import { formatDay, toDateInput } from "./format";

const getReferenceId = (reference) => reference?._id ?? reference ?? "";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
};

export const getGameLabel = (game) => {
  if (!game) return "-";
  return `${game.location} · ${game.status} · ${formatDay(game.start_date)}`;
};

export const getParticipationLabel = (participation) => {
  if (!participation) return "";
  return `a participação de ${participation.player_id?.name ?? "jogador"} em ${
    participation.game_id?.location ?? "jogo"
  }`;
};

export const toParticipationForm = (participation) => {
  if (!participation) return EMPTY_PARTICIPATION_FORM;

  return {
    game_id: getReferenceId(participation.game_id),
    team_id: getReferenceId(participation.team_id),
    player_id: getReferenceId(participation.player_id),
    confirmation_date: toDateInput(participation.confirmation_date),
    payment: {
      completed: participation.payment?.completed ?? false,
      amount_paid: participation.payment?.amount_paid ?? "",
      payment_date: toDateInput(participation.payment?.payment_date),
    },
    match_stats: { ...EMPTY_STATS, ...participation.match_stats },
  };
};

export const toParticipationPayload = (form) => {
  const { completed, amount_paid, payment_date } = form.payment;

  return {
    game_id: form.game_id,
    team_id: form.team_id,
    player_id: form.player_id,
    confirmation_date: form.confirmation_date || null,
    payment: completed
      ? {
          completed,
          amount_paid: toNumber(amount_paid),
          payment_date: payment_date || null,
        }
      : { ...EMPTY_PAYMENT, amount_paid: 0, payment_date: null },
    match_stats: Object.fromEntries(
      STAT_FIELDS.map((stat) => [stat.key, toNumber(form.match_stats[stat.key])]),
    ),
  };
};
