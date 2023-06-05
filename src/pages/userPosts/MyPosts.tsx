import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { CardToggleMenu } from "../../components/buttons/CardToggleMenu";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";

export const MyPosts = () => {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const dispatch = useAppDispatch();
  const { showAlert } = useAppSelector((state) => state.contentSlice);

  const getMyPost = async () => {
    await postsApi
      .getMyPosts()
      .then((res) => {
        if (res.status === 200) {
          setPostList(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
        
        dispatch(
          changeAlert({ message: err.response.statusText, color: "green" })
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
      views: post.views,
      likes: post.likes,
      shortcontent: post.shortcontent,
      title: post.title,
      name: post.name,
      user_id: post.user_id,
    };
  
    return (
      <div className="relative" key={post.id}>
        <Link to={`/post/${post.id}`} >
          <ArticleCard {...props} />
        </Link>
        <span className="absolute top-3 right-4">
        <CardToggleMenu post_id={post.id}/>
        </span>
        
      </div>
    );
  });

  useEffect(() => {
    getMyPost();
  }, [showAlert]);

  return (
    <div className="bg-slate-50 ">
      {postList.length ? (
        <div className="grid grid-cols-2 max-lg:grid-cols-2 gap-8 pt-8 pb-8 contain">
          {posts}
        </div>
      ) : (
        <div>Not added yet</div>
      )}
    </div>
  );
};

export default MyPosts;
