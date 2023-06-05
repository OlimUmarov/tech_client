export const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 w-screen h-screen bg-white flex justify-center items-center">
    <div className="flex flex-col justify-center items-center  w-24">
        <div>
      <div className="animate-pulse flex  gap-1 pb-1">
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
      </div>
      <div className="animate-pulse flex gap-1  pb-1">
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
      </div>
      <div className="animate-pulse flex gap-1  pb-1">
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
      </div>
      </div>
      <div className="text-blue-500 font-medium text-md pt-1 w-full text-center">Yuklanmoqda</div>
    </div>  
    </div>
  );
};
