const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#faf9f7] fixed inset-0 z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingPage;