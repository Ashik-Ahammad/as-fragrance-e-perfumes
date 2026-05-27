const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-6 bg-base-100">
      <div className="relative flex items-center justify-center">
        <span className="loading loading-ring w-20 text-warning opacity-20"></span>
        <span className="loading loading-ring w-14 text-warning opacity-50 absolute"></span>
        <span className="loading loading-infinity w-10 text-warning absolute"></span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-serif text-base-content tracking-tight">
          Pouring Perfumes
          <span className="inline-flex gap-0.5 ml-1 text-warning">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;