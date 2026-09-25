import { LEADER_CATEGORIES, POSITION_OPTIONS } from "../constants/player";

export const getPositionLabel = (value) => {
  return (
    POSITION_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
};

export const getStat = (player, stat) => player?.total_stats?.[stat] ?? 0;

export const getLeaders = (players) => {
  if (players.length === 0) return [];

  return LEADER_CATEGORIES.map((category) => ({
    ...category,
    player: players.reduce((best, player) =>
      getStat(player, category.stat) > getStat(best, category.stat)
        ? player
        : best,
    ),
  }));
};
