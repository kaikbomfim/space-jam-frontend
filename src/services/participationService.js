import axios from "axios";

const participationService = axios.create({
  baseURL: "http://localhost:8000/participations",
});

export const getParticipations = async () => {
  const response = await participationService.get("/");
  return response.data;
};

export const findParticipationByIds = async (gameId, teamId, playerId) => {
  let url = "/find?";
  if (gameId) url += `game_id=${gameId}&`;
  if (teamId) url += `team_id=${teamId}&`;
  if (playerId) url += `player_id=${playerId}&`;
  url = url.slice(0, -1);
  const response = await participationService.get(url);
  return response.data;
};

export const getParticipation = async (id) => {
  const response = await participationService.get(`/${id}`);
  return response.data;
};

export const createParticipation = async (participation) => {
  const response = await participationService.post("/", participation);
  return response.data;
};

export const updateParticipation = async (participation, id) => {
  const response = await participationService.patch(`/${id}`, participation);
  return response.data;
};

export const deleteParticipation = async (id) => {
  const response = await participationService.delete(`/${id}`);
  return response.data;
};
