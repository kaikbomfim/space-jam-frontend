export const POSITION_OPTIONS = [
  { value: "armador", label: "Armador" },
  { value: "ala", label: "Ala" },
  { value: "ala-pivo", label: "Ala-pivô" },
  { value: "pivo", label: "Pivô" },
];

export const STAT_FIELDS = [
  { key: "points", label: "Pontos", abbr: "PTS" },
  { key: "assists", label: "Assistências", abbr: "AST" },
  { key: "rebounds", label: "Rebotes", abbr: "REB" },
  { key: "steals", label: "Roubos", abbr: "ROB" },
  { key: "blocks", label: "Tocos", abbr: "TOC" },
];

export const EMPTY_STATS = {
  points: 0,
  assists: 0,
  rebounds: 0,
  steals: 0,
  blocks: 0,
};

export const LEADER_CATEGORIES = [
  { stat: "points", title: "CESTINHA", unit: "pontos", variant: "flame" },
  { stat: "assists", title: "GARÇOM", unit: "assistências", variant: "nebula" },
  { stat: "rebounds", title: "REBOTEIRO", unit: "rebotes", variant: "aurora" },
];

export const EMPTY_PLAYER_FORM = {
  name: "",
  email: "",
  phone: "",
  favorite_position: POSITION_OPTIONS[0].value,
  total_stats: EMPTY_STATS,
};
