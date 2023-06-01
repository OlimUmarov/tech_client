
export const ArticleCardSkeleton = () => {

  return (
    <div role="status" className="relative post-item flex max-md:flex-col max-lg:w-full max-md:w-full max-sm:w-full cursor-pointer">
    <div className="post-item__content animate-pulse">
      <section className="lg:h-32">
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
        <div className="post-item__desc">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>

        </div>
      </section>

      <section className="pt-4 flex gap-2 post-item__desc">
        <span className="post-item__desc ">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
        </span>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

        <div className="flex justify-center items-center gap-1">
          <span className="post-item__btn"></span>
        </div>

        <span className="post-item__btn flex items-center"></span>
      </section>
    </div>

    <section color="blue-gray" className="post-item__img">
    <div className="w-32 h-32 bg-gray-200 rounded-2xl dark:bg-gray-700 mb-4 "></div>
    </section>
  </div>
  );
};
