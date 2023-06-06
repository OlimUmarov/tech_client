import { Link, useSearchParams } from "react-router-dom";
import { postsApi } from "../../api/postsApi";
import { useEffect, useState } from "react";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Posts } from "../../types/posts";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";

export const Search = () => {
  const [searchResults, setSearchResults] = useState<Array<Posts>>([]);
  const [filteredPosts, setFilteredPosts] = useState<Array<Posts>>([]);
  const [searchParams] = useSearchParams();
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  // const [fetching, setFetching] = useState<boolean>(true);

  const getAllPost = async () => {
    const count: number = Math.ceil(totalCount / 10);
    if (currentPage <= count) {
      await postsApi
        .allPosts(currentPage)
        .then((res) => {
          dispatch(changeSkeleteon(true));
          if (res.status === 200) {
            setSearchResults([...searchResults, ...res.data.results]);
            setCurrentPage((prev) => prev + 1);
            setTotalCount(res.data.totalCount);
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
    }
  };

  const filterPosts = () => {
    const posts = searchResults.filter(
      (post: { title: string | null }) =>
        post.title &&
        post.title
          .toLocaleLowerCase()
          .includes(searchParams.get("query")?.toLocaleLowerCase() || "")
    );
    setFilteredPosts(posts);
  };

  const posts: JSX.Element[] = filteredPosts.map((post) => {
    const props = {
      actived_at: post.actived_at,
      category: post.category,
      content: post.content,
      id: post.id,
      img: post.img,
      likes: post.likes,
      shortcontent: post.shortcontent,
      title: post.title,
      views: post.views,
      name: post.name,
      user_id: post.user_id,
    };
    return (
      <Link to={`/post/${post.id}`} key={post.id}>
        <ArticleCard {...props} />
      </Link>
    );
  });

  useEffect(() => {
    console.log("render");

    getAllPost();
    filterPosts();
  }, [currentPage, searchParams, searchResults]);

  return (
    <div className="bg-slate-50 ">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-8 pt-8 pb-8 contain">
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
    </div>
  );
};
