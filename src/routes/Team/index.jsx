import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import FormModal from "../../components/FormModal";
import FormField from "../../components/FormField";
import DeleteModal from "../../components/DeleteModal";
import {
  getTeams,
  getTeamByName,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../services/teamService";
import { EMPTY_TEAM_FORM } from "../../constants/team";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [formData, setFormData] = useState(EMPTY_TEAM_FORM);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = searchTerm
          ? await getTeamByName(searchTerm)
          : await getTeams();
        setTeams(data);
      } catch (error) {
        console.error(error);
        setTeams([]);
      }
    };

    loadTeams();
  }, [searchTerm, reloadKey]);

  const reloadTeams = () => {
    setReloadKey((key) => key + 1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.trim());
  };

  const handleAddClick = () => {
    setCurrentTeam(null);
    setFormData(EMPTY_TEAM_FORM);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (team) => {
    setCurrentTeam(team);
    setFormData({ name: team.name });
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (team) => {
    setCurrentTeam(team);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async () => {
    try {
      if (currentTeam) {
        await updateTeam(formData, currentTeam._id);
      } else {
        await createTeam(formData);
      }
      setIsFormModalOpen(false);
      reloadTeams();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTeam(currentTeam._id);
      setIsDeleteModalOpen(false);
      reloadTeams();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Header
        title="Times"
        description="As equipes que disputam as partidas da liga."
        count={teams.length}
        addLabel="Novo time"
        onAddClick={handleAddClick}
      >
        <SearchBar placeholder="Buscar por nome…" onSearch={handleSearch} />
      </Header>

      <Table>
        <Table.Header>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell className="text-right">
            Ações
          </Table.HeadCell>
        </Table.Header>

        <Table.Body>
          {teams.length > 0 ? (
            teams.map((team) => (
              <Table.Row key={team._id}>
                <Table.Cell className="font-mono text-sm text-muted">
                  {team._id}
                </Table.Cell>
                <Table.Cell className="font-display font-bold tracking-wide">
                  {team.name}
                </Table.Cell>
                <Table.Cell>
                  <Table.Actions
                    onEdit={() => handleEditClick(team)}
                    onDelete={() => handleDeleteClick(team)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={3}
                className="py-10 text-center text-muted"
              >
                Nenhum time encontrado.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentTeam ? "Editar Time" : "Novo Time"}
        onSubmit={handleFormSubmit}
        isEditing={!!currentTeam}
      >
        <FormField id="team-name" label="Nome">
          <FormField.Input
            type="text"
            id="team-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormField>
      </FormModal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        resourceName={currentTeam?.name}
      />
    </PageContainer>
  );
};

export default Team;
