export const Loading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-transparent backdrop-filter backdrop-blur-sm pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="flex mb-2 gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <div className="flex mb-2 gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <p className="text-blue-500 mt-2">Yuklanmoqda...</p>
        </div>
      </div>
    );
  };
  