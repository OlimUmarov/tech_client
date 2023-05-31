import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";

export const MyPosts = () => {
  const [postList, setPostList] = useState<Array<Posts>>([]);

  const getMyPost = async () => {
    try {
      const response: AxiosResponse<any> = await postsApi.getMyPosts();
      setPostList(response.data.results);
    } catch (error: any) {
      console.log("getMyPosts" + error.message);
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
      <Link to={`/my-posts/${post.id}`} key={post.id}>
        <ArticleCard {...props} />
      </Link>
    );
  });

  useEffect(() => {
    getMyPost();
  }, []);

  return (
    <div className="bg-slate-50">
      <div>{postList.length ? <div>{posts}</div> : <div>Not added yet</div>}</div>
    </div>
  );
};

export default MyPosts;
