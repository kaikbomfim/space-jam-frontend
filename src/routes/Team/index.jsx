import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import ResourceHeader from "../../components/ResourceHeader";
import SearchBar from "../../components/SearchBar";
import ResourceTable from "../../components/ResourceTable";
import FormModal from "../../components/FormModal";
import DeleteModal from "../../components/DeleteModal";
import {
  getTeams,
  getTeamByName,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../services/teamService";

const TeamHeader = ({ onAddClick, onSearch }) => {
  return (
    <div>
      <ResourceHeader title="Times" icon={Users} onAddClick={onAddClick} />
      <SearchBar placeholder="Buscar time pelo nome..." onSearch={onSearch} />
    </div>
  );
};

const TeamTable = ({ teams, onEditClick, onDeleteClick }) => {
  return (
    <ResourceTable>
      <ResourceTable.Header>
        <ResourceTable.HeadCell>ID</ResourceTable.HeadCell>
        <ResourceTable.HeadCell>Nome</ResourceTable.HeadCell>
        <ResourceTable.HeadCell className="text-right">
          Ações
        </ResourceTable.HeadCell>
      </ResourceTable.Header>

      <ResourceTable.Body>
        {teams.length > 0 ? (
          teams.map((team) => (
            <ResourceTable.Row key={team._id}>
              <ResourceTable.Cell>{team._id}</ResourceTable.Cell>
              <ResourceTable.Cell className="font-medium text-gray-900">
                {team.name}
              </ResourceTable.Cell>
              <ResourceTable.Cell>
                <ResourceTable.Actions
                  onEdit={() => onEditClick(team)}
                  onDelete={() => onDeleteClick(team)}
                />
              </ResourceTable.Cell>
            </ResourceTable.Row>
          ))
        ) : (
          <ResourceTable.Row>
            <ResourceTable.Cell colSpan={3} className="py-8 text-center">
              Nenhum time encontrado.
            </ResourceTable.Cell>
          </ResourceTable.Row>
        )}
      </ResourceTable.Body>
    </ResourceTable>
  );
};

const TeamFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentTeam,
  formData,
  setFormData,
}) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={currentTeam ? "Editar Time" : "Novo Time"}
      onSubmit={onSubmit}
      isEditing={!!currentTeam}
    >
      <div>
        <label
          htmlFor="team-name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          type="text"
          id="team-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
    </FormModal>
  );
};

const TeamDeleteModal = ({ isOpen, onClose, onConfirm, currentTeam }) => {
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      resourceName={currentTeam?.name}
    />
  );
};

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = searchTerm
          ? await getTeamByName(searchTerm)
          : await getTeams();
        setTeams(data);
      } catch (error) {
        console.error(error);
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
    setFormData({ name: "" });
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
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <TeamHeader onAddClick={handleAddClick} onSearch={handleSearch} />

      <TeamTable
        teams={teams}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <TeamFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        currentTeam={currentTeam}
        formData={formData}
        setFormData={setFormData}
      />

      <TeamDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        currentTeam={currentTeam}
      />
    </div>
  );
};

export default Team;
