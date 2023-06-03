import { EditPosts } from "../../components/posts/EditPosts";
import { useParams } from "react-router-dom";
import { Post, postsApi } from "../../api/postsApi";
import { useEffect, useState } from "react";

export const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>({});

  const getMyPostData = async () => {
    if (!id || id === undefined) return new Error("asda");
    const post_id = parseInt(id);
    await postsApi.getMyPost(post_id).then((res) => {
      if (res.status === 200) {
        const result:Post = {
          title: res.data.data.title,
          shortcontent: res.data.data.shortcontent,
          content: res.data.data.content,
          category: res.data.data.category,
          img: res.data.data.img,
          id: post_id
        };
        setPost(result) 
               
      }
    });
  };

  useEffect(() => {
    getMyPostData();
  }, []);

  return (
    <div className="bg-white">
      <div className=" contain">
        <EditPosts post={post}/>
      </div>
    </div>
  );
};
