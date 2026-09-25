import axios from "axios";

const gameService = axios.create({
  baseURL: "http://localhost:8000/games",
});

export const getGames = async () => {
  const response = await gameService.get("/");
  return response.data;
};

export const findGameByStatus = async (status) => {
  const response = await gameService.get(`/find?status=${status}`);
  return response.data;
};

export const getGame = async (id) => {
  const response = await gameService.get(`/${id}`);
  return response.data;
};

export const createGame = async (game) => {
  const response = await gameService.post("/", game);
  return response.data;
};

export const updateGame = async (game, id) => {
  const response = await gameService.patch(`/${id}`, game);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await gameService.delete(`/${id}`);
  return response.data;
};
