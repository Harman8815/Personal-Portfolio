const MainLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white z-[9999]">
      <p className="text-xl animate-pulse">Loading site...</p>
    </div>
  );
};

export default MainLoader;
