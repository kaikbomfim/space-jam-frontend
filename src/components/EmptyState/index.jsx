const EmptyState = ({ icon: Icon, title, message }) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[20px] border border-space-500 bg-space-850 px-6 py-10 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-space-800 text-nebula">
          <Icon size={26} strokeWidth={1.8} />
        </div>
      )}
      {title && <h2 className="font-display text-xl font-bold">{title}</h2>}
      <p className="text-[15px] text-muted">{message}</p>
    </div>
  );
};

export default EmptyState;
