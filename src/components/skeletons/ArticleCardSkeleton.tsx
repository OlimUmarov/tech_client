export const ArticleCardSkeleton = () => {
  return (
    <div className="bg-slate-50 ">
      <div className="relative post-item flex max-sm:flex max-lg:w-[500px] max-md:w-full max-sm:w-full cursor-pointer m-auto">
        <div className="post-item__content animate-pulse">
          <section className="lg:h-30">
            <div className="h-5 post-item__title bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
            <div className="post-item__short mb-4">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>

            <section className="flex gap-2 post-item__desc pad">
              <span className="post-item__desc  ">
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
              </span>
              <div className="h-3 post-item__btn bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
              <div className="h-3 post-item__btn bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>

              <div className="flex justify-center items-center gap-1">
                <span className="post-item__btn"></span>
              </div>

              <span className="post-item__btn flex items-center"></span>
            </section>
          </section>
        </div>
        <section color="blue-gray" className="post-item__img">
          <div className="rounded-2xl max-md:w-40 w-32 h-28 bg-gray-200 max-md:h-28 max-lg:h-28 max-xl:w-30 max-xl:h-30 max-sm:w-44"></div>
          {/* <div className="rounded-2xl w-32 h-28 bg-gray-200 max-md:w-40 max-md:h-28 max-lg:w-40 max-lg:h-28 max-xl:w-48 max-xl:h-30 max-sm:w-44"></div> */}
        </section>
      </div>
    </div>
  );
};
