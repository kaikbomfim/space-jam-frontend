import { useEffect, useState } from "react";
import { CircleCheck, ClipboardCheck, Wallet } from "lucide-react";
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
  getParticipations,
  findParticipationByIds,
  createParticipation,
  updateParticipation,
  deleteParticipation,
} from "../../services/participationService";
import { getGames } from "../../services/gameService";
import { getTeams } from "../../services/teamService";
import { getPlayers } from "../../services/playerService";
import {
  EMPTY_PARTICIPATION_FORM,
  EMPTY_PAYMENT,
  PARTICIPATION_TOAST_MESSAGES,
  TEAM_FILTER_ALL,
} from "../../constants/participation";
import { STAT_FIELDS } from "../../constants/player";
import { formatCurrency, formatDay } from "../../utils/format";
import {
  preventInvalidNumberKeys,
  sanitizePositiveDecimal,
  toSelectOptions,
} from "../../utils/form";
import {
  getGameLabel,
  getParticipationLabel,
  toParticipationForm,
  toParticipationPayload,
} from "../../utils/participation";
import { getErrorMessage } from "../../utils/toast";

const Participation = () => {
  const [participations, setParticipations] = useState([]);
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentParticipation, setCurrentParticipation] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PARTICIPATION_FORM);
  const toast = useToast();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [gamesData, teamsData, playersData] = await Promise.all([
          getGames(),
          getTeams(),
          getPlayers(),
        ]);
        setGames(gamesData);
        setTeams(teamsData);
        setPlayers(playersData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const loadParticipations = async () => {
      try {
        const data = teamFilter
          ? await findParticipationByIds(null, teamFilter)
          : await getParticipations();
        setParticipations(data);
      } catch (error) {
        console.error(error);
        setParticipations([]);
      }
    };

    loadParticipations();
  }, [teamFilter, reloadKey]);

  const gameOptions = toSelectOptions(games, getGameLabel);
  const teamOptions = toSelectOptions(teams, (team) => team.name);
  const playerOptions = toSelectOptions(players, (player) => player.name);
  const selectPlaceholder = isLoadingOptions ? "Carregando..." : "Selecione...";

  const paidParticipations = participations.filter(
    (participation) => participation.payment?.completed,
  );
  const totalCollected = paidParticipations.reduce(
    (total, participation) => total + (participation.payment.amount_paid ?? 0),
    0,
  );

  const reloadParticipations = () => {
    setReloadKey((key) => key + 1);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePaymentCompletedChange = (e) => {
    setFormData({
      ...formData,
      payment: e.target.checked
        ? { ...formData.payment, completed: true }
        : EMPTY_PAYMENT,
    });
  };

  const handlePaymentChange = (field, sanitize) => (e) => {
    const value = sanitize ? sanitize(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      payment: { ...formData.payment, [field]: value },
    });
  };

  const handleStatChange = (stat) => (e) => {
    setFormData({
      ...formData,
      match_stats: { ...formData.match_stats, [stat]: e.target.value },
    });
  };

  const handleAddClick = () => {
    setCurrentParticipation(null);
    setFormData(EMPTY_PARTICIPATION_FORM);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (participation) => {
    setCurrentParticipation(participation);
    setFormData(toParticipationForm(participation));
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (participation) => {
    setCurrentParticipation(participation);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async () => {
    try {
      const payload = toParticipationPayload(formData);
      if (currentParticipation) {
        await updateParticipation(payload, currentParticipation._id);
      } else {
        await createParticipation(payload);
      }
      toast.success(
        currentParticipation
          ? PARTICIPATION_TOAST_MESSAGES.update
          : PARTICIPATION_TOAST_MESSAGES.create,
      );
      setIsFormModalOpen(false);
      reloadParticipations();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteParticipation(currentParticipation._id);
      toast.success(PARTICIPATION_TOAST_MESSAGES.delete);
      setIsDeleteModalOpen(false);
      reloadParticipations();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <PageContainer>
      <Header
        title="Participações"
        description="Quem jogou, por qual time, em qual jogo — com pagamento e desempenho."
        count={participations.length}
        addLabel="Nova participação"
        onAddClick={handleAddClick}
      >
        <SelectFilter
          label="Filtrar por time"
          options={[TEAM_FILTER_ALL, ...teamOptions]}
          value={teamFilter}
          onChange={setTeamFilter}
        />
      </Header>

      <CardGrid>
        <HighlightCard
          label="PARTICIPAÇÕES"
          title="registradas"
          value={participations.length}
          icon={ClipboardCheck}
          variant="nebula"
        />
        <HighlightCard
          label="PAGAMENTOS"
          title="concluídos"
          value={`${paidParticipations.length} / ${participations.length}`}
          icon={CircleCheck}
          variant="aurora"
        />
        <HighlightCard
          label="ARRECADADO"
          title="no total"
          value={formatCurrency(totalCollected)}
          valueSize="md"
          icon={Wallet}
          variant="flame"
        />
      </CardGrid>

      <Table>
        <Table.Header>
          <Table.HeadCell>Jogador</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Jogo</Table.HeadCell>
          <Table.HeadCell>Confirmação</Table.HeadCell>
          <Table.HeadCell>Pagamento</Table.HeadCell>
          {STAT_FIELDS.map((stat) => (
            <Table.HeadCell key={stat.key} className="text-right">
              <abbr title={stat.label} className="no-underline">
                {stat.abbr}
              </abbr>
            </Table.HeadCell>
          ))}
          <Table.HeadCell className="text-right">Ações</Table.HeadCell>
        </Table.Header>

        <Table.Body>
          {participations.length > 0 ? (
            participations.map((participation) => (
              <Table.Row key={participation._id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar name={participation.player_id?.name} />
                    <span className="font-bold">
                      {participation.player_id?.name}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="soft" shape="tag">
                    {participation.team_id?.name}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span>{participation.game_id?.location}</span>
                    <span className="text-[13px] text-muted">
                      {formatDay(participation.game_id?.start_date)}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-ink-soft">
                  {formatDay(participation.confirmation_date)}
                </Table.Cell>
                <Table.Cell>
                  {participation.payment?.completed ? (
                    <div className="flex items-center gap-2.5">
                      <Badge variant="success">Pago</Badge>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {formatCurrency(participation.payment.amount_paid)}
                        </span>
                        <span className="text-[13px] text-muted">
                          {formatDay(participation.payment.payment_date)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Badge variant="neutral">Pendente</Badge>
                  )}
                </Table.Cell>
                {STAT_FIELDS.map((stat) => (
                  <Table.Cell
                    key={stat.key}
                    className={`text-right ${
                      stat.key === "points" ? "font-bold text-flame-soft" : ""
                    }`}
                  >
                    {participation.match_stats?.[stat.key] ?? 0}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Table.Actions
                    onEdit={() => handleEditClick(participation)}
                    onDelete={() => handleDeleteClick(participation)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={6 + STAT_FIELDS.length}
                className="py-10 text-center text-muted"
              >
                Nenhuma participação encontrada.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentParticipation ? "Editar Participação" : "Nova Participação"}
        onSubmit={handleFormSubmit}
        isEditing={!!currentParticipation}
      >
        <FormField id="participation-game" label="Jogo">
          <FormField.Select
            id="participation-game"
            options={gameOptions}
            placeholder={selectPlaceholder}
            value={formData.game_id}
            onChange={handleChange("game_id")}
            disabled={isLoadingOptions}
            required
          />
        </FormField>

        <FormField.Row>
          <FormField id="participation-team" label="Time">
            <FormField.Select
              id="participation-team"
              options={teamOptions}
              placeholder={selectPlaceholder}
              value={formData.team_id}
              onChange={handleChange("team_id")}
              disabled={isLoadingOptions}
              required
            />
          </FormField>

          <FormField id="participation-player" label="Jogador">
            <FormField.Select
              id="participation-player"
              options={playerOptions}
              placeholder={selectPlaceholder}
              value={formData.player_id}
              onChange={handleChange("player_id")}
              disabled={isLoadingOptions}
              required
            />
          </FormField>
        </FormField.Row>

        <FormField id="participation-confirmation-date" label="Data de Confirmação">
          <FormField.Input
            type="date"
            id="participation-confirmation-date"
            value={formData.confirmation_date}
            onChange={handleChange("confirmation_date")}
            required
          />
        </FormField>

        <FormField.Group legend="Pagamento">
          <FormField.Checkbox
            id="participation-payment-completed"
            label="Pagamento concluído"
            checked={formData.payment.completed}
            onChange={handlePaymentCompletedChange}
          />
          <FormField.Row>
            <FormField id="participation-amount-paid" label="Valor Pago (R$)" size="sm">
              <FormField.Input
                type="number"
                id="participation-amount-paid"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                value={formData.payment.amount_paid}
                onChange={handlePaymentChange("amount_paid", sanitizePositiveDecimal)}
                onKeyDown={preventInvalidNumberKeys}
                disabled={!formData.payment.completed}
                required={formData.payment.completed}
              />
            </FormField>

            <FormField id="participation-payment-date" label="Data do Pagamento" size="sm">
              <FormField.Input
                type="date"
                id="participation-payment-date"
                value={formData.payment.payment_date}
                onChange={handlePaymentChange("payment_date")}
                disabled={!formData.payment.completed}
                required={formData.payment.completed}
              />
            </FormField>
          </FormField.Row>
        </FormField.Group>

        <FormField.Group legend="Estatísticas da Partida">
          <FormField.Row columns={3}>
            {STAT_FIELDS.map((stat) => (
              <FormField
                key={stat.key}
                id={`participation-stat-${stat.key}`}
                label={stat.label}
                size="sm"
              >
                <FormField.Input
                  type="number"
                  id={`participation-stat-${stat.key}`}
                  min="0"
                  value={formData.match_stats[stat.key]}
                  onChange={handleStatChange(stat.key)}
                  onKeyDown={preventInvalidNumberKeys}
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
        resourceName={getParticipationLabel(currentParticipation)}
      />
    </PageContainer>
  );
};

export default Participation;
