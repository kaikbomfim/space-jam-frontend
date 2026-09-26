import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/Header";
import SelectFilter from "../../components/SelectFilter";
import CardGrid from "../../components/CardGrid";
import HighlightCard from "../../components/HighlightCard";
import Table from "../../components/Table";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import FormModal from "../../components/FormModal";
import FormField from "../../components/FormField";
import DeleteModal from "../../components/DeleteModal";
import { useToast } from "../../hooks/useToast";
import {
  getPlayers,
  getPlayerByFavoritePosition,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../../services/playerService";
import {
  EMPTY_PLAYER_FORM,
  EMPTY_STATS,
  PLAYER_TOAST_MESSAGES,
  POSITION_FILTERS,
  POSITION_OPTIONS,
  STAT_FIELDS,
} from "../../constants/player";
import { getLeaders, getPositionLabel, getStat } from "../../utils/player";
import { getErrorMessage } from "../../utils/toast";

const Player = () => {
  const [players, setPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PLAYER_FORM);
  const toast = useToast();

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = positionFilter
          ? await getPlayerByFavoritePosition(positionFilter)
          : await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error(error);
        setPlayers([]);
      }
    };

    loadPlayers();
  }, [positionFilter, reloadKey]);

  const leaders = getLeaders(players);

  const reloadPlayers = () => {
    setReloadKey((key) => key + 1);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleStatChange = (stat) => (e) => {
    setFormData({
      ...formData,
      total_stats: { ...formData.total_stats, [stat]: e.target.value },
    });
  };

  const handleAddClick = () => {
    setCurrentPlayer(null);
    setFormData(EMPTY_PLAYER_FORM);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (player) => {
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      email: player.email,
      phone: player.phone,
      favorite_position: player.favorite_position,
      total_stats: { ...EMPTY_STATS, ...player.total_stats },
    });
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (player) => {
    setCurrentPlayer(player);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async () => {
    const payload = {
      ...formData,
      total_stats: Object.fromEntries(
        STAT_FIELDS.map((stat) => [
          stat.key,
          Number(formData.total_stats[stat.key]),
        ]),
      ),
    };

    try {
      if (currentPlayer) {
        await updatePlayer(payload, currentPlayer._id);
      } else {
        await createPlayer(payload);
      }
      toast.success(
        currentPlayer
          ? PLAYER_TOAST_MESSAGES.update
          : PLAYER_TOAST_MESSAGES.create,
      );
      setIsFormModalOpen(false);
      reloadPlayers();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePlayer(currentPlayer._id);
      toast.success(PLAYER_TOAST_MESSAGES.delete);
      setIsDeleteModalOpen(false);
      reloadPlayers();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <PageContainer>
      <Header
        title="Jogadores"
        description="Atletas cadastrados e suas estatísticas acumuladas."
        count={players.length}
        addLabel="Novo jogador"
        onAddClick={handleAddClick}
      >
        <SelectFilter
          label="Filtrar por posição"
          options={POSITION_FILTERS}
          value={positionFilter}
          onChange={setPositionFilter}
        />
      </Header>

      {leaders.length > 0 && (
        <CardGrid>
          {leaders.map((leader) => (
            <HighlightCard
              key={leader.stat}
              label={leader.title}
              title={leader.player.name}
              value={getStat(leader.player, leader.stat)}
              unit={leader.unit}
              avatarName={leader.player.name}
              variant={leader.variant}
            />
          ))}
        </CardGrid>
      )}

      <Table>
        <Table.Header>
          <Table.HeadCell>Jogador</Table.HeadCell>
          <Table.HeadCell>Posição</Table.HeadCell>
          <Table.HeadCell>Contato</Table.HeadCell>
          {STAT_FIELDS.map((stat) => (
            <Table.HeadCell key={stat.key} className="text-right">
              <abbr title={stat.label} className="no-underline">
                {stat.abbr}
              </abbr>
            </Table.HeadCell>
          ))}
          <Table.HeadCell className="text-right">
            Ações
          </Table.HeadCell>
        </Table.Header>

        <Table.Body>
          {players.length > 0 ? (
            players.map((player) => (
              <Table.Row key={player._id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar name={player.name} />
                    <span className="font-bold">{player.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="soft" shape="tag">
                    {getPositionLabel(player.favorite_position)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col text-[13px] text-muted">
                    <span>{player.email}</span>
                    <span>{player.phone}</span>
                  </div>
                </Table.Cell>
                {STAT_FIELDS.map((stat) => (
                  <Table.Cell
                    key={stat.key}
                    className={`text-right ${
                      stat.key === "points" ? "font-bold text-flame-soft" : ""
                    }`}
                  >
                    {getStat(player, stat.key)}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Table.Actions
                    onEdit={() => handleEditClick(player)}
                    onDelete={() => handleDeleteClick(player)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={4 + STAT_FIELDS.length}
                className="py-10 text-center text-muted"
              >
                Nenhum jogador encontrado.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentPlayer ? "Editar Jogador" : "Novo Jogador"}
        onSubmit={handleFormSubmit}
        isEditing={!!currentPlayer}
      >
        <FormField id="player-name" label="Nome">
          <FormField.Input
            type="text"
            id="player-name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
        </FormField>

        <FormField.Row>
          <FormField id="player-email" label="E-mail">
            <FormField.Input
              type="email"
              id="player-email"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </FormField>

          <FormField id="player-phone" label="Telefone">
            <FormField.Input
              type="tel"
              id="player-phone"
              value={formData.phone}
              onChange={handleChange("phone")}
              required
            />
          </FormField>
        </FormField.Row>

        <FormField id="player-favorite-position" label="Posição Favorita">
          <FormField.Select
            id="player-favorite-position"
            options={POSITION_OPTIONS}
            value={formData.favorite_position}
            onChange={handleChange("favorite_position")}
            required
          />
        </FormField>

        <FormField.Group legend="Estatísticas Totais">
          <FormField.Row columns={3}>
            {STAT_FIELDS.map((stat) => (
              <FormField
                key={stat.key}
                id={`player-stat-${stat.key}`}
                label={stat.label}
                size="sm"
              >
                <FormField.Input
                  type="number"
                  id={`player-stat-${stat.key}`}
                  min="0"
                  value={formData.total_stats[stat.key]}
                  onChange={handleStatChange(stat.key)}
                  required
                />
              </FormField>
            ))}
          </FormField.Row>
        </FormField.Group>
      </FormModal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        resourceName={currentPlayer?.name}
      />
    </PageContainer>
  );
};

export default Player;
