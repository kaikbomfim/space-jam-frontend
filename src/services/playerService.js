import axios from "axios";

const playerService = axios.create({
  baseURL: "http://localhost:8000/players",
});

export const getPlayers = async () => {
  const response = await playerService.get("/");
  return response.data;
};

export const getPlayerByFavoritePosition = async (favoritePosition) => {
  const response = await playerService.get(`/find?favoritePosition=${favoritePosition}`);
  return response.data;
};

export const getPlayer = async (id) => {
  const response = await playerService.get(`/${id}`);
  return response.data;
};

export const createPlayer = async (player) => {
  const response = await playerService.post("/", player);
  return response.data;
};

export const updatePlayer = async (player, id) => {
  const response = await playerService.patch(`/${id}`, player);
  return response.data;
};

export const deletePlayer = async (id) => {
  const response = await playerService.delete(`/${id}`);
  return response.data;
};
