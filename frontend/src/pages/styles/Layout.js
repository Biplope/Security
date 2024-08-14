const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light dark:bg-dark ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
