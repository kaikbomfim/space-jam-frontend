import { CARD_GRID_COLUMNS } from "../../constants/styles/cardGrid";

const CardGrid = ({ columns = 3, children }) => {
  return <div className={`grid gap-6 ${CARD_GRID_COLUMNS[columns]}`}>{children}</div>;
};

export default CardGrid;
