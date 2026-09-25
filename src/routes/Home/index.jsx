import { useEffect, useState } from "react";
import {
  CalendarX,
  ClipboardCheck,
  LayoutGrid,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import PageContainer from "../../components/PageContainer";
import Hero from "../../components/Hero";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import SectionTitle from "../../components/SectionTitle";
import CardGrid from "../../components/CardGrid";
import HighlightCard from "../../components/HighlightCard";
import Card from "../../components/Card";
import DateBadge from "../../components/DateBadge";
import Badge from "../../components/Badge";
import Scoreboard from "../../components/Scoreboard";
import EmptyState from "../../components/EmptyState";
import { getGames } from "../../services/gameService";
import { getTeams } from "../../services/teamService";
import { getPlayers } from "../../services/playerService";
import { getParticipations } from "../../services/participationService";
import {
  formatCurrency,
  formatDate,
  formatSchedule,
} from "../../utils/format";
import { getLeaders, getStat } from "../../utils/player";
import {
  RECENT_RESULTS_LIMIT,
  UPCOMING_GAMES_LIMIT,
} from "../../constants/home";
import { GAME_STATUS_BADGE_VARIANTS } from "../../constants/game";

const Home = () => {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const results = await Promise.allSettled([
        getGames(),
        getTeams(),
        getPlayers(),
        getParticipations(),
      ]);

      const [gamesData, teamsData, playersData, participationsData] =
        results.map((result) => {
          if (result.status === "rejected") {
            console.error(result.reason);
            return [];
          }
          return result.value;
        });

      setGames(gamesData);
      setTeams(teamsData);
      setPlayers(playersData);
      setParticipations(participationsData);
    };

    loadData();
  }, []);

  const openGames = games.filter((game) => game.status === "aberto");

  const upcomingGames = [...openGames]
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, UPCOMING_GAMES_LIMIT);

  const recentResults = games
    .flatMap((game) =>
      (game.matches ?? []).map((match) => ({
        ...match,
        location: game.location,
      })),
    )
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, RECENT_RESULTS_LIMIT);

  const paidParticipations = participations.filter(
    (participation) => participation.payment?.completed,
  );

  const leaders = getLeaders(players);

  return (
    <PageContainer>
      <Hero
        eyebrow={`LIGA DE BASQUETE · TEMPORADA ${new Date().getFullYear()}`}
        title={
          <>
            Bem-vindo ao Space<span className="text-flame">Jam</span>
          </>
        }
        description="Organize jogos, times, jogadores e participações da liga em um só lugar — do primeiro arremesso ao placar final."
        illustration={<Logo size={340} showText={false} />}
      >
        <Button size="lg" to="/games" icon={LayoutGrid}>
          Ver jogos
        </Button>
        <Button size="lg" variant="secondary" to="/players" icon={Users}>
          Ver jogadores
        </Button>
      </Hero>

      <CardGrid columns={4}>
        <HighlightCard
          label="JOGOS"
          title={`${openGames.length} abertos`}
          value={games.length}
          icon={LayoutGrid}
          variant="flame"
        />
        <HighlightCard
          label="TIMES"
          title="na liga"
          value={teams.length}
          icon={Shield}
          variant="nebula"
        />
        <HighlightCard
          label="JOGADORES"
          title="cadastrados"
          value={players.length}
          icon={Users}
          variant="aurora"
        />
        <HighlightCard
          label="PARTICIPAÇÕES"
          title={`${paidParticipations.length} pagas`}
          value={participations.length}
          icon={ClipboardCheck}
        />
      </CardGrid>

      <section className="flex flex-col gap-5">
        <SectionTitle title="Próximos jogos" to="/games" />
        {upcomingGames.length > 0 ? (
          <CardGrid>
            {upcomingGames.map((game) => (
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
                <Card.Footer>
                  <span className="text-muted">
                    {game.player_limit?.min}–{game.player_limit?.max} jogadores
                  </span>
                  <span className="font-bold">
                    {formatCurrency(game.total_value)}
                  </span>
                </Card.Footer>
              </Card>
            ))}
          </CardGrid>
        ) : (
          <EmptyState
            icon={CalendarX}
            message="Nenhum jogo aberto no momento."
          />
        )}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="flex flex-col gap-5">
          <SectionTitle title="Últimos resultados" to="/games" />
          {recentResults.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentResults.map((match, index) => (
                <div key={match._id ?? index} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-muted">
                    {match.location} · {formatDate(match.start_date)}
                  </span>
                  <Scoreboard
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
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Trophy} message="Nenhuma partida disputada ainda." />
          )}
        </section>

        <section className="flex flex-col gap-5">
          <SectionTitle title="Destaques" to="/players" />
          {leaders.length > 0 ? (
            <div className="flex flex-col gap-4">
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
            </div>
          ) : (
            <EmptyState icon={Users} message="Nenhum jogador cadastrado ainda." />
          )}
        </section>
      </div>
    </PageContainer>
  );
};

export default Home;
