import axios from "axios";

const teamService = axios.create({
  baseURL: "http://localhost:8000/teams",
});

export const getTeams = async () => {
  const response = await teamService.get("/");
  return response.data;
};

export const getTeamByName = async (name) => {
  const response = await teamService.get(`/find?name=${name}`);
  return response.data;
};

export const getTeam = async (id) => {
  const response = await teamService.get(`/${id}`);
  return response.data;
};

export const createTeam = async (team) => {
  const response = await teamService.post("/", team);
  return response.data;
};

export const updateTeam = async (team, id) => {
  const response = await teamService.patch(`/${id}`, team);
  return response.data;
};

export const deleteTeam = async (id) => {
  const response = await teamService.delete(`/${id}`);
  return response.data;
};
