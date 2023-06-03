import { useEffect, useState } from "react";
import {  postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";

function AllPosts() {
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();

  const getPosts = async () => {
    const count:number = Math.ceil(totalCount)
    if (fetching && currentPage <= count) { 
      dispatch(changeSkeleteon(true));
        await postsApi
          .allPosts(currentPage)
          .then((res) => {
            if (res.status === 200) {
              setPostList([...postList,...res.data.results]);
              setCurrentPage((prev)=> prev + 1)
              setTotalCount(res.data.totalCount)
                          }
          })
          .catch((err) => {
            dispatch(
              changeAlert({ message: err.response.statusText, color: "red" })
            );
          }).finally(()=>{
            setFetching(false)
            dispatch(changeSkeleteon(false));
          })
    }
   
  };

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 ){
        setFetching(true)        
    }
  }

  const posts = postList.map((post) => {
    const props = {
      actived_at: post.actived_at,
      category: post.category,
      name: post.name,
      content: post.content,
      id: post.id,
      img: post.img,
      likes: post.likes,
      shortcontent: post.shortcontent,
      title: post.title,
      user_id: post.user_id,
      views: post.views
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
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching]);

  return (
    <div className="bg-slate-50 ">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1 gap-8 pt-8 pb-8 contain">
        {posts}
       
      </div>
      {(skeleton && currentPage <= Math.ceil(totalCount)) &&  <ArticleCardSkeleton />}
    </div>
  );
}

export default AllPosts;
