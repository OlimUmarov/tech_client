import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";
function NewPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();

  const getPosts = async () => {
    dispatch(changeSkeleteon(true));
    try {
      await postsApi
        .allPosts()
        .then((res) => {
          if (res.status === 200) {
            setPostList(res.data.results);
          }
        })
        .catch((err) => {
          dispatch(
            changeAlert({ message: err.response.statusText, color: "red" })
          );
        });
    } finally {
      dispatch(changeSkeleteon(false));
    }
  };

  const posts = postList.map((post) => {
    const props = {
      actived_at: post.actived_at,
      category: post.category,
      content: post.content,
      id: post.id,
      img: post.img,
      likes: post.likes,
      shortcontent: post.shortcontent,
      title: post.title,
      user_id: post.user_id,
    };
    return (
      <div key={post.id}>
        <Link to={`/post/${post.id}`}>
          <ArticleCard {...props} />
        </Link>
      </div>
    );
  });

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-slate-50 ">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-8 pt-8 pb-8 contain">
        {posts}
       
      </div>
      {skeleton && <ArticleCardSkeleton />}
    </div>
  );
}

export default NewPosts;
