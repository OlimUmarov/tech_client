import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";

function PopularPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);

  const getPosts = async () => {
    const response = await postsApi.allPosts();
    setPostList(response.data.results);
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
    return <ArticleCard {...props} key={post.id} />;
  });

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 pt-8 pb-8  container">
        {posts}
      </div>
    </div>
  );
}

export default PopularPosts;
