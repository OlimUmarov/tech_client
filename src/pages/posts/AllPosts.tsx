import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";
import BasicPagination from "../../components/pagination/Pagination";

function AllPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();

  const getPosts = async (currentPage: number) => {
    dispatch(changeSkeleteon(true));
    await postsApi
      .allPosts(currentPage)
      .then((res) => {
        if (res.status === 200) {
          setPostList(res.data.results);
          setTotalCount(Math.ceil(res.data.totalCount / 10));
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      })
      .finally(() => {
        dispatch(changeSkeleteon(false));
      });
  };

  const posts = postList.map((post) => {
    const props = {
      actived_at: post.actived_at,
      category: post.category,
      name: post.name,
      content: post.content,
      id: post.id,
      img: post.img,
      likes: post.likes,
      shortcontent: post.shortcontent,
      title: post.title,
      user_id: post.user_id,
      views: post.views,
    };
    return (
      <div key={post.id}>
        <Link to={`/post/${post.id}`}>
          <ArticleCard {...props} />
        </Link>
      </div>
    );
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getPosts(page);
  };

  useEffect(() => {
    getPosts(1);
  }, []);

  return (
    <div className="bg-slate-50">
      <div className={`grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-8 pt-8 pb-8 contain`}>
        {!skeleton && posts}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
      </div>

      {(!skeleton && postList.length > 0) &&<div className={`w-full flex justify-center items-center ${postList.length < 7 ? "absolute bottom-0" : ""}`}>
       <BasicPagination
         totalCount={totalCount}
         currentPage={currentPage}
         onPageChange={handlePageChange}
       />
     </div>}

      {!postList.length && !skeleton && (
        <div>
          <div className="contain flex flex-col justify-center items-center pt-20">
            <div>
              <h1 className="w-96 mb-4 text-2xl font-medium">
                Postlar hali yaratilmagan
              </h1>
              <p className="w-96">
                Postlar hali yaratilmagan, post qoshilishini kutishingiz mumkin yoki ozingiz post yaratishingiz mumkin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
