const DateBadge = ({ date }) => {
  const value = new Date(date);
  const day = String(value.getDate()).padStart(2, "0");
  const month = value
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase();

  return (
    <time
      dateTime={value.toISOString()}
      className="flex h-17 w-16 shrink-0 flex-col items-center justify-center rounded-[14px] bg-space-800"
    >
      <span className="font-display text-2xl font-bold">{day}</span>
      <span className="text-xs font-bold tracking-[1.5px] text-muted">
        {month}
      </span>
    </time>
  );
};

export default DateBadge;
