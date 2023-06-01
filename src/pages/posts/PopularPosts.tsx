import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link } from "react-router-dom";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";

function PopularPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const dispatch = useAppDispatch();

  const getPosts = async () => {
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
      <Link to={`/post/${post.id}`} key={post.id}>
        <ArticleCard {...props} />
      </Link>
    );
  });

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 pt-8 pb-8  contain">
        {posts}
      </div>
    </div>
  );
}

export default PopularPosts;
