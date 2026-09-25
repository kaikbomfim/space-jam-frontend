const PageContainer = ({ children }) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">{children}</div>
  );
};

export default PageContainer;
