import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts, orderByType } from "../../types/posts";
import { Link } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";
import BasicPagination from "../../components/pagination/Pagination";

function PopularPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [orderBy, setOrderBy] = useState<orderByType>("views");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { skeleton } = useAppSelector((state) => state.contentSlice);

  const getPosts = async (currentPage: number) => {
    dispatch(changeSkeleteon(true));
    await postsApi
      .filteredPosts(orderBy, currentPage)
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
      content: post.content,
      id: post.id,
      img: post.img,
      name: post.name,
      likes: post.likes,
      views: post.views,
      shortcontent: post.shortcontent,
      title: post.title,
      user_id: post.user_id,
    };
    return (
      <Link to={`/post/${post.id}`} key={post.id}>
        <ArticleCard {...props} />
      </Link>
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
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 pt-8 pb-8  contain">
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

      {postList.length && (
        <div className="w-full flex justify-center items-center">
          <BasicPagination
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default PopularPosts;
