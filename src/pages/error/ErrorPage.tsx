const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50  px-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-16a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold ml-4">Xatolik yuz berdi!</h1>
        </div>
        <p className="text-gray-700">
        Bu veb-sahifani ko‘rsatishda nimadir xato ketdi. Iltimos, yangilang yoki keyinroq qayta tashrif buyuring.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
