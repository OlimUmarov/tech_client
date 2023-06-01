import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link, useParams } from "react-router-dom";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";

function Categories() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [catPosts, setCatPosts] = useState<Array<Posts>>([]);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const getPosts = async (catId: string | undefined) => {
   await postsApi.allPosts().then((res) => {
    if(res.status === 200){
      const data = res.data.results;
      const filteredPost = data.filter((post) => post.category == catId);
      setPostList(data);
      setCatPosts(filteredPost);
    }
   }).catch((err) => {
    dispatch(
      changeAlert({ message: err.response.statusText, color: "red" })
    );
   })

  };



  const posts: JSX.Element[] = postList.map((post) => {
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

  const showCatPosts: JSX.Element[] = catPosts.map((post) => {
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
    getPosts(id);
  }, []);

  return (
    <div className="bg-slate-50">
      {catPosts.length ? (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 pt-8 pb-8  contain">
          {showCatPosts}
        </div>
      ) : (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 pt-8 pb-8   contain">
          {posts}
        </div>
      )}
    </div>
  );
}

export default Categories;
