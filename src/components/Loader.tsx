const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="absolute inset-0 bg-blue-950/30 backdrop-filter"></div>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl z-10 border border-white/30 shadow-xl relative">
          {/* Snowflake loader animation */}
          <div className="animate-spin h-20 w-20 border-8 border-blue-200 border-t-red-400 rounded-full"></div>
          <p className="text-lg mt-4 text-white font-semibold tracking-wider">
            Loading...
          </p>
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-red-400/40 rounded-full blur-md"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-300/40 rounded-full blur-md"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-300/40 rounded-full blur-md"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-red-400/40 rounded-full blur-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
