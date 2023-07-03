import { EditPosts } from "../../components/posts/EditPosts";
import { useParams } from "react-router-dom";
import { Post, postsApi } from "../../api/postsApi";
import { useAppSelector,useAppDispatch } from "../../app/hook";
import {  changeLoading,changeAlert } from "../../features/contentSlice";
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";

export const EditPost = () => {
  const { id } = useParams();
  const { isLoading } = useAppSelector((state) => state.contentSlice);
  const [post, setPost] = useState<Post>();
  const dispatch = useAppDispatch();

  const getMyPostData = async () => {
    dispatch(changeLoading(true))
    setTimeout(()=> {
      dispatch(changeLoading(false))
      },15000)
    if (!id || id === undefined) return new Error("asda");
    const post_id = parseInt(id);
    await postsApi.getMyPost(post_id).then((res) => {
      if (res.status === 200) {
        const result = {
          title: res.data.data.title,
          shortcontent: res.data.data.shortcontent,
          content: res.data.data.content,
          category: res.data.data.category,
          img: res.data.data.img,
          id: post_id
        };
        setPost(result) 
        dispatch(changeLoading(false))
      }
    }).catch(()=> {
      dispatch(changeLoading(false))
      dispatch(
        changeAlert({ message: "Post bilan xatolik yuz berdi", color: "red" })
      );
    }).finally(()=> {
      dispatch(changeLoading(false))
    })
  };

  useEffect(() => {
    getMyPostData();
  }, []);

  return (
    <div className="bg-white">
      <div className=" contain">
        <EditPosts post={post}/>
        {(isLoading || !post) &&  <Loading/>}
      </div>
    </div>
  );
};
