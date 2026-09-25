import { SCOREBOARD_TEAM_STYLES } from "../../constants/styles/scoreboard";

const getTeamStyle = (isWinner) => {
  return isWinner ? SCOREBOARD_TEAM_STYLES.winner : SCOREBOARD_TEAM_STYLES.loser;
};

const Scoreboard = ({ home, away, winner }) => {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-xl bg-space-900 px-4 py-3 text-sm">
      <span className={`truncate ${getTeamStyle(winner === "home")}`}>
        {home.name}
      </span>
      <span className="font-display text-[15px] font-bold tracking-wider">
        {home.score} <span className="text-space-300">:</span> {away.score}
      </span>
      <span
        className={`truncate text-right ${getTeamStyle(winner === "away")}`}
      >
        {away.name}
      </span>
    </div>
  );
};

export default Scoreboard;
