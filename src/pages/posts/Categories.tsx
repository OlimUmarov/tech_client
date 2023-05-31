import {  useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";

function Categories() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [catPosts,setCatPosts] = useState<Array<Posts>>([])
  const { id } = useParams();

  const getPosts = async (catId: string | undefined) => {
    try {
      const response: AxiosResponse<any> = await postsApi.allPosts();
      const data = response.data.results;
      const filteredPost = data.filter((post) => post.category == catId);
      setPostList(data)
      setCatPosts(filteredPost);
    } catch (error: any) {
      console.log(error.message);
    }
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
    return <ArticleCard {...props} key={post.id} />;
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
    return <ArticleCard {...props} key={post.id} />;
  });

  useEffect(() => {
    getPosts(id);
  }, []);

  return (
    <div className="bg-slate-50">
      {catPosts.length ? 
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 pt-8 pb-8  container">
          {showCatPosts}
        </div>
       :(
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 pt-8 pb-8   container">
          {posts}
          </div>
       )
      }
    </div>
  );
}

export default Categories;
