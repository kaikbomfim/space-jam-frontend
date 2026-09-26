import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import FormModal from "../../components/FormModal";
import Header from '../../components/Header';
import SearchBar from "../../components/SearchBar";
import Table from '../../components/Table';
import { getGames } from "../../services/gameService";
import {
    createParticipation,
    deleteParticipation,
    findParticipationByIds,
    getParticipations,
    updateParticipation,
} from "../../services/participationService";
import { getPlayers } from "../../services/playerService";
import { getTeams } from "../../services/teamService";

const ParticipationTooltip = ({ content, children, position = "top" }) => {
    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <span className="group relative inline-block">
            {children}
            <span
                role="tooltip"
                className={`pointer-events-none absolute z-50 w-max rounded-md bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 ${positions[position]}`}
            >
                {content}
            </span>
        </span>
    );
};

const ParticipationHeader = ({ onAddClick, onSearch }) => {
    return (
        <div>
            <Header title="Participações" icon={Users} onAddClick={onAddClick} />
            <SearchBar placeholder="Buscar time pelo nome..." onSearch={onSearch} />
        </div>
    );
};

const ParticipationTable = ({ participations, onEditClick, onDeleteClick }) => {
    return (
        <Table>
            <Table.Header>
                <Table.HeadCell>ID do Jogo</Table.HeadCell>
                <Table.HeadCell>Jogo</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Jogador</Table.HeadCell>
                <Table.HeadCell>Confirmado em</Table.HeadCell>
                <Table.HeadCell>Pago</Table.HeadCell>
                <Table.HeadCell className="text-right">Ações</Table.HeadCell>
            </Table.Header>

            <Table.Body>
                {participations.length > 0 ? (
                    participations.map((participation) => (
                        <Table.Row key={participation._id}>
                            <Table.Cell>{participation.game_id._id}</Table.Cell>
                            <Table.Cell className="font-medium">
                                {participation.game_id.location} /{" "}
                                {participation.game_id.status} /{" "}
                                {new Date(participation.game_id.start_date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </Table.Cell>
                            <Table.Cell>{participation.team_id.name}</Table.Cell>
                            <Table.Cell>
                                <ParticipationTooltip
                                    position="bottom"
                                    content={
                                        <div className="space-y-1">
                                            <div className="border-gray-700">
                                                <p>Roubos: {participation.match_stats.steals}</p>
                                                <p>Rebotes: {participation.match_stats.rebounds}</p>
                                                <p>Bloqueios: {participation.match_stats.blocks}</p>
                                                <p>Pontos: {participation.match_stats.points}</p>
                                                <p>Assistências: {participation.match_stats.assists}</p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <span className="cursor-help underline decoration-dotted">
                                        {participation.player_id.name}
                                    </span>
                                </ParticipationTooltip>
                            </Table.Cell>
                            <Table.Cell>
                                {new Date(participation.confirmation_date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </Table.Cell>
                            <Table.Cell>
                                {participation.payment.completed ? (
                                    <ParticipationTooltip
                                        position="bottom"
                                        content={
                                            <div className="space-y-1">
                                                <div className="border-gray-700">
                                                    <p>
                                                        Valor pago:{" "}
                                                        {new Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(participation.payment.amount_paid)}
                                                    </p>
                                                    <p>
                                                        Pago em:{" "}
                                                        {new Date(participation.payment.payment_date).toLocaleDateString("pt-BR", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <span className="cursor-help underline decoration-dotted">Sim</span>
                                    </ParticipationTooltip>
                                ) : (
                                    "Não"
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <Table.Actions
                                    onEdit={() => onEditClick(participation)}
                                    onDelete={() => onDeleteClick(participation)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell colSpan={7} className="py-8 text-center">
                            Nenhuma participação encontrada.
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

const formatGameLabel = (game) => {
    if (!game) return "";
    const date = game.start_date
        ? new Date(game.start_date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "";
    return `${game.location} / ${game.status} / ${date}`;
};

const sanitizePositiveDecimal = (raw) => {
    let cleaned = raw.replace(/[^0-9.]/g, "");

    const firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
        cleaned =
            cleaned.slice(0, firstDot + 1) +
            cleaned.slice(firstDot + 1).replace(/\./g, "");
    }

    if (firstDot !== -1) {
        const [intPart, decPart] = cleaned.split(".");
        cleaned = `${intPart}.${decPart.slice(0, 2)}`;
    }

    return cleaned;
};

// Campos que dependem de payment_completed
const PAYMENT_DEPENDENT_FIELDS = ["payment_amount_paid", "payment_payment_date"];

const MODAL_FIELDS = [
    {
        name: "game_id",
        label: "Jogo",
        type: "select",
        getLabel: formatGameLabel,
    },
    {
        name: "team_id",
        label: "Time",
        type: "select",
        getLabel: (team) => team?.name ?? team?._id ?? "",
    },
    {
        name: "player_id",
        label: "Jogador",
        type: "select",
        getLabel: (player) => player?.name ?? player?._id ?? "",
    },
    { name: "confirmation_date", label: "Data de Confirmação", type: "date" },
    { name: "payment_completed", label: "Pagamento Concluído", type: "checkbox" },
    {
        name: "payment_amount_paid",
        label: "Valor Pago",
        type: "number",
        min: "0",
        step: "0.01",
        sanitize: sanitizePositiveDecimal,
    },
    { name: "payment_payment_date", label: "Data do Pagamento", type: "date" },
    { name: "match_stats_steals", label: "Roubos", type: "number", min: "0" },
    { name: "match_stats_rebounds", label: "Rebotes", type: "number", min: "0" },
    { name: "match_stats_blocks", label: "Bloqueios", type: "number", min: "0" },
    { name: "match_stats_points", label: "Pontos", type: "number", min: "0" },
    { name: "match_stats_assists", label: "Assistências", type: "number", min: "0" },
];

const buildInitialFormData = (participation = null) => {
    const base = MODAL_FIELDS.reduce((acc, field) => {
        acc[field.name] = field.type === "checkbox" ? false : "";
        return acc;
    }, {});

    if (participation) {
        base.game_id = participation.game_id?._id ?? participation.game_id ?? "";
        base.team_id = participation.team_id?._id ?? participation.team_id ?? "";
        base.player_id = participation.player_id?._id ?? participation.player_id ?? "";
        base.confirmation_date = participation.confirmation_date
            ? participation.confirmation_date.slice(0, 10)
            : "";
        base.payment_completed = participation.payment?.completed ?? false;
        base.payment_amount_paid =
            participation.payment?.amount_paid != null
                ? String(participation.payment.amount_paid)
                : "";
        base.payment_payment_date = participation.payment?.payment_date
            ? participation.payment.payment_date.slice(0, 10)
            : "";
        base.match_stats_steals = participation.match_stats?.steals ?? "";
        base.match_stats_rebounds = participation.match_stats?.rebounds ?? "";
        base.match_stats_blocks = participation.match_stats?.blocks ?? "";
        base.match_stats_points = participation.match_stats?.points ?? "";
        base.match_stats_assists = participation.match_stats?.assists ?? "";
    }

    return base;
};

const ParticipationFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    currentParticipation,
    formData,
    setFormData,
}) => {
    const [options, setOptions] = useState({ game_id: [], team_id: [], player_id: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        let cancelled = false;
        setLoading(true);

        Promise.all([getGames(), getTeams(), getPlayers()])
            .then(([games, teams, players]) => {
                if (cancelled) return;
                setOptions({
                    game_id: games ?? [],
                    team_id: teams ?? [],
                    player_id: players ?? [],
                });
            })
            .catch(console.error)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [isOpen]);

    const handleChange = (field, rawValue) => {
        // Ao desmarcar "Pagamento Concluído", limpa os campos dependentes
        if (field.name === "payment_completed" && rawValue === false) {
            setFormData((prev) => {
                const next = { ...prev, payment_completed: false };
                PAYMENT_DEPENDENT_FIELDS.forEach((name) => {
                    next[name] = "";
                });
                return next;
            });
            return;
        }

        const value =
            typeof field.sanitize === "function" ? field.sanitize(rawValue) : rawValue;

        setFormData((prev) => ({ ...prev, [field.name]: value }));
    };

    const renderField = (field) => {
        const value = formData[field.name] ?? (field.type === "checkbox" ? false : "");

        // Campos dependentes de payment_completed
        const isPaymentDependent = PAYMENT_DEPENDENT_FIELDS.includes(field.name);
        const paymentCompleted = !!formData.payment_completed;
        const disabled = isPaymentDependent && !paymentCompleted;
        const isRequired =
            field.name === "payment_amount_paid" || field.name === "payment_payment_date"
                ? paymentCompleted
                : field.name !== "payment_amount_paid" && field.name !== "payment_payment_date";

        if (field.type === "select") {
            const fieldOptions = options[field.name] ?? [];
            const getLabel = field.getLabel ?? ((opt) => opt?.name ?? opt?._id ?? "");

            return (
                <select
                    id={`participation-${field.name}`}
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={loading}
                    className="block w-full rounded-md border border-indigo-400/30 bg-indigo-950/40 px-3 py-2 text-sm text-indigo-50 placeholder-indigo-300/40 shadow-sm transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 disabled:cursor-not-allowed disabled:border-indigo-400/20 disabled:bg-indigo-950/60 disabled:text-indigo-300/40"
                    required
                >
                    <option value="">{loading ? "Carregando..." : "Selecione..."}</option>
                    {fieldOptions.map((opt) => (
                        <option key={opt._id ?? opt.id} value={String(opt._id ?? opt.id)}>
                            {getLabel(opt)}
                        </option>
                    ))}
                </select>
            );
        }

        if (field.type === "checkbox") {
            return (
                <input
                    type="checkbox"
                    id={`participation-${field.name}`}
                    checked={!!value}
                    onChange={(e) => handleChange(field, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
            );
        }

        if (field.type === "number") {
            return (
                <input
                    type="number"
                    id={`participation-${field.name}`}
                    value={value}
                    min={field.min ?? "0"}
                    step={field.step ?? "1"}
                    inputMode="decimal"
                    disabled={disabled}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onKeyDown={(e) => {
                        if (["-", "+", "e", "E"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onPaste={(e) => {
                        const pasted = e.clipboardData.getData("text");
                        if (/[^0-9.]/.test(pasted)) {
                            e.preventDefault();
                            const sanitized = field.sanitize
                                ? field.sanitize(pasted)
                                : pasted.replace(/[^0-9.]/g, "");
                            const current = String(formData[field.name] ?? "");
                            handleChange(field, current + sanitized);
                        }
                    }}
                    required={isRequired}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
            );
        }

        return (
            <input
                type={field.type}
                id={`participation-${field.name}`}
                value={value}
                disabled={disabled}
                onChange={(e) => handleChange(field, e.target.value)}
                required={isRequired}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
        );
    };

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title={currentParticipation ? "Editar Participação" : "Nova Participação"}
            onSubmit={onSubmit}
            isEditing={!!currentParticipation}
        >
            <div className="max-h-[60vh] overflow-y-auto pr-1">
                {MODAL_FIELDS.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label
                            htmlFor={`participation-${field.name}`}
                            className={`mb-1 block text-sm font-medium text-gray-700 ${
                                field.type === "checkbox" ? "inline-flex items-center gap-2" : ""
                            } ${field.type === "checkbox" ? "" : "w-full"}`}
                        >
                            {field.type === "checkbox" ? (
                                <>
                                    {renderField(field)}
                                    {field.label}
                                </>
                            ) : (
                                <>
                                    {field.label}
                                    {renderField(field)}
                                </>
                            )}
                        </label>
                    </div>
                ))}
            </div>
        </FormModal>
    );
};

const ParticipationDeleteModal = ({ isOpen, onClose, onConfirm, currentParticipation }) => {
    return (
        <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            resourceName={currentParticipation?.name}
        />
    );
};

const Participation = () => {
    const [participations, setParticipation] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentParticipation, setCurrentParticipation] = useState(null);
    const [formData, setFormData] = useState(() => buildInitialFormData());

    useEffect(() => {
        const loadParticipations = async () => {
            try {
                const data = searchTerm
                    ? await findParticipationByIds(searchTerm)
                    : await getParticipations();
                setParticipation(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        };

        loadParticipations();
    }, [searchTerm, reloadKey]);

    const reloadParticipations = () => {
        setReloadKey((key) => key + 1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term.trim());
    };

    const handleAddClick = () => {
        setCurrentParticipation(null);
        setFormData(buildInitialFormData());
        setIsFormModalOpen(true);
    };

    const handleEditClick = (participation) => {
        setCurrentParticipation(participation);
        setFormData(buildInitialFormData(participation));
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (participation) => {
        setCurrentParticipation(participation);
        setIsDeleteModalOpen(true);
    };

    const toNumber = (value) => {
        if (value === "" || value == null) return 0;
        const n = Number(value);
        return Number.isFinite(n) && n >= 0 ? n : 0;
    };

    const buildPayload = (data) => ({
        game_id: data.game_id,
        team_id: data.team_id,
        player_id: data.player_id,
        confirmation_date: data.confirmation_date || null,
        payment: {
            completed: !!data.payment_completed,
            amount_paid: data.payment_completed ? toNumber(data.payment_amount_paid) : 0,
            payment_date: data.payment_completed ? data.payment_payment_date || null : null,
        },
        match_stats: {
            steals: toNumber(data.match_stats_steals),
            rebounds: toNumber(data.match_stats_rebounds),
            blocks: toNumber(data.match_stats_blocks),
            points: toNumber(data.match_stats_points),
            assists: toNumber(data.match_stats_assists),
        },
    });

    const handleFormSubmit = async () => {
        // Validação extra: se marcou pago, exige valor e data
        if (formData.payment_completed) {
            const hasAmount =
                formData.payment_amount_paid !== "" &&
                Number(formData.payment_amount_paid) > 0;
            const hasDate = !!formData.payment_payment_date;

            if (!hasAmount || !hasDate) {
                // Se quiser, troque por um toast/alerta do seu design system
                alert(
                    "Informe o valor pago (maior que zero) e a data do pagamento quando o pagamento estiver concluído."
                );
                return;
            }
        }

        try {
            const payload = buildPayload(formData);

            if (currentParticipation) {
                await updateParticipation(payload, currentParticipation._id);
            } else {
                await createParticipation(payload);
            }
            setIsFormModalOpen(false);
            reloadParticipations();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteParticipation(currentParticipation._id);
            setIsDeleteModalOpen(false);
            reloadParticipations();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
            <ParticipationHeader onAddClick={handleAddClick} onSearch={handleSearch} />

            <ParticipationTable
                participations={participations}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />

            <ParticipationFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                currentParticipation={currentParticipation}
                formData={formData}
                setFormData={setFormData}
            />

            <ParticipationDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                currentParticipation={currentParticipation}
            />
        </div>
    );
};

export default Participation;