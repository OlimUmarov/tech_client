
export const PostSkeleton = () => {
  return (
    <div>
    <div className="flex bg-white pt-16 postContainer max-md:block animate-pulse">
      {/* Post Sidebar Categories ... */}
      <div className="sidebar">
        <div className="flex flex-col  max-md:flex-row max-md:hidden max-md:text-xs gap-5 md:text-xl font-semibold">
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>

        </div>
      </div>

      {/* Post Information Title,Category,Views ... */}
      <div className=" content  flex flex-col ">
        <h1 className="article_title max-md:text-3xl max-sm:text-2xl">
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>

        </h1>
        <h1 className="text-sm w-full mb-6">            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
</h1>
        <div className="article__page">
          <div className="post__flex flex gap-5">
            <span className="post-item__desc post text-base sm:text-sm cursor-pointer hover:scale-105 transition-all duration-100 ease-in-out">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
            </span>
            <span className="post-item__btn flex items-center text-base sm:text-sm">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
            </span>
          </div>

          {/* Post Image ... */}
          <div className="flex items-center justify-center pb-10">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>

          </div>

          {/* Post Content ... */}
          <div
            className="post__content">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>
        </div>
      </div>
      <div className="flex flex-col gap-10 pl-14 max-lg:hidden pb-4">
      <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-md:w-34 max-sm:w-28  mb-4"></div>

      </div>
    </div>
  </div>
  </div>
  )
}