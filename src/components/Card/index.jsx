const CardHeader = ({ children }) => {
  return <div className="flex items-start gap-4">{children}</div>;
};

const CardTitle = ({ title, subtitle }) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <h2 className="truncate text-[19px] font-bold">{title}</h2>
      {subtitle && <span className="text-sm text-muted">{subtitle}</span>}
    </div>
  );
};

const CardBody = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const CardFooter = ({ children }) => {
  return (
    <div className="mt-auto flex items-center justify-between gap-3 border-t border-space-500 pt-4 text-sm">
      {children}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <article className="flex flex-col gap-5 rounded-[20px] border border-space-500 bg-space-850 p-6">
      {children}
    </article>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
