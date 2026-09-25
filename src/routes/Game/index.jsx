import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FilterChips from "../../components/FilterChips";
import CardGrid from "../../components/CardGrid";
import Card from "../../components/Card";
import DateBadge from "../../components/DateBadge";
import Badge from "../../components/Badge";
import Scoreboard from "../../components/Scoreboard";
import ActionButtons from "../../components/ActionButtons";
import EmptyState from "../../components/EmptyState";
import FormModal from "../../components/FormModal";
import FormField from "../../components/FormField";
import DeleteModal from "../../components/DeleteModal";
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from "../../services/gameService";
import {
  formatCurrency,
  formatDate,
  formatSchedule,
  normalize,
  toDateTimeLocal,
} from "../../utils/format";
import {
  EMPTY_GAME_FORM,
  GAME_STATUS_BADGE_VARIANTS,
  GAME_STATUS_FILTERS,
  GAME_STATUS_OPTIONS,
} from "../../constants/game";

const Game = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [formData, setFormData] = useState(EMPTY_GAME_FORM);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error(error);
        setGames([]);
      }
    };

    loadGames();
  }, [reloadKey]);

  const gamesByLocation = games.filter((game) =>
    normalize(game.location).includes(normalize(searchTerm)),
  );

  const filteredGames = statusFilter
    ? gamesByLocation.filter((game) => game.status === statusFilter)
    : gamesByLocation;

  const statusFilterOptions = GAME_STATUS_FILTERS.map((option) => ({
    ...option,
    count: option.value
      ? gamesByLocation.filter((game) => game.status === option.value).length
      : gamesByLocation.length,
  }));

  const reloadGames = () => {
    setReloadKey((key) => key + 1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.trim());
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddClick = () => {
    setCurrentGame(null);
    setFormData(EMPTY_GAME_FORM);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (game) => {
    setCurrentGame(game);
    setFormData({
      location: game.location,
      status: game.status,
      start_date: toDateTimeLocal(game.start_date),
      end_date: toDateTimeLocal(game.end_date),
      total_value: game.total_value,
      player_limit_min: game.player_limit?.min ?? "",
      player_limit_max: game.player_limit?.max ?? "",
    });
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (game) => {
    setCurrentGame(game);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async () => {
    const payload = {
      location: formData.location,
      status: formData.status,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      total_value: Number(formData.total_value),
      player_limit: {
        min: Number(formData.player_limit_min),
        max: Number(formData.player_limit_max),
      },
    };

    try {
      if (currentGame) {
        await updateGame(payload, currentGame._id);
      } else {
        await createGame({ ...payload, matches: [] });
      }
      setIsFormModalOpen(false);
      reloadGames();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteGame(currentGame._id);
      setIsDeleteModalOpen(false);
      reloadGames();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Header
        title="Jogos"
        description="Encontros marcados nas quadras da liga, com suas partidas e placares."
        count={games.length}
        addLabel="Novo jogo"
        onAddClick={handleAddClick}
      >
        <SearchBar placeholder="Buscar por local…" onSearch={handleSearch} />
      </Header>

      <FilterChips
        label="Filtrar por status"
        options={statusFilterOptions}
        value={statusFilter}
        onChange={setStatusFilter}
      />

      {filteredGames.length > 0 ? (
        <CardGrid>
          {filteredGames.map((game) => (
            <Card key={game._id}>
              <Card.Header>
                <DateBadge date={game.start_date} />
                <Card.Title
                  title={game.location}
                  subtitle={formatSchedule(game.start_date, game.end_date)}
                />
                <Badge variant={GAME_STATUS_BADGE_VARIANTS[game.status]}>
                  {game.status}
                </Badge>
              </Card.Header>

              {game.matches?.length > 0 && (
                <Card.Body>
                  {game.matches.map((match, index) => (
                    <Scoreboard
                      key={match._id ?? index}
                      home={{
                        name: match.team_1?.name,
                        score: match.team_1?.total_score,
                      }}
                      away={{
                        name: match.team_2?.name,
                        score: match.team_2?.total_score,
                      }}
                      winner={match.result === "time1" ? "home" : "away"}
                    />
                  ))}
                </Card.Body>
              )}

              <Card.Footer>
                <span className="text-muted">
                  {game.player_limit?.min}–{game.player_limit?.max} jogadores
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    {formatCurrency(game.total_value)}
                  </span>
                  <ActionButtons
                    onEdit={() => handleEditClick(game)}
                    onDelete={() => handleDeleteClick(game)}
                  />
                </div>
              </Card.Footer>
            </Card>
          ))}
        </CardGrid>
      ) : (
        <EmptyState message="Nenhum jogo encontrado." />
      )}

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentGame ? "Editar Jogo" : "Novo Jogo"}
        onSubmit={handleFormSubmit}
        isEditing={!!currentGame}
      >
        <FormField id="game-location" label="Local">
          <FormField.Input
            type="text"
            id="game-location"
            value={formData.location}
            onChange={handleChange("location")}
            required
          />
        </FormField>

        <FormField id="game-status" label="Status">
          <FormField.Select
            id="game-status"
            options={GAME_STATUS_OPTIONS}
            value={formData.status}
            onChange={handleChange("status")}
            required
          />
        </FormField>

        <FormField.Row>
          <FormField id="game-start-date" label="Início">
            <FormField.Input
              type="datetime-local"
              id="game-start-date"
              value={formData.start_date}
              onChange={handleChange("start_date")}
              required
            />
          </FormField>

          <FormField id="game-end-date" label="Fim">
            <FormField.Input
              type="datetime-local"
              id="game-end-date"
              value={formData.end_date}
              onChange={handleChange("end_date")}
              min={formData.start_date}
              required
            />
          </FormField>
        </FormField.Row>

        <FormField id="game-total-value" label="Valor Total (R$)">
          <FormField.Input
            type="number"
            id="game-total-value"
            min="0"
            step="0.01"
            value={formData.total_value}
            onChange={handleChange("total_value")}
            required
          />
        </FormField>

        <FormField.Row>
          <FormField id="game-player-limit-min" label="Mínimo de Jogadores">
            <FormField.Input
              type="number"
              id="game-player-limit-min"
              min="0"
              value={formData.player_limit_min}
              onChange={handleChange("player_limit_min")}
              required
            />
          </FormField>

          <FormField id="game-player-limit-max" label="Máximo de Jogadores">
            <FormField.Input
              type="number"
              id="game-player-limit-max"
              min={formData.player_limit_min || 0}
              value={formData.player_limit_max}
              onChange={handleChange("player_limit_max")}
              required
            />
          </FormField>
        </FormField.Row>
      </FormModal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        resourceName={
          currentGame
            ? `${currentGame.location} (${formatDate(currentGame.start_date)})`
            : ""
        }
      />
    </PageContainer>
  );
};

export default Game;
