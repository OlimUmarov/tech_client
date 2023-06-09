import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { AxiosResponse } from "axios";
import { Posts } from "../../types/posts";
import { Category, categoriesApi } from "../../api/categoriesApi";
import { PostCard } from "../../components/posts/PostCard";
import { Link, useParams } from "react-router-dom";
import { formatDate, formatDateAuthor } from "../../components/posts/formatDate";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { MdVisibility } from "react-icons/md";
import { getLike, setLike } from "../../lib/itemStorage";
import { changeAlert, changeLoading } from "../../features/contentSlice";
import { Loading } from "../../components/loading/Loading";
import Author from "../../assets/authorization.svg"

export const Post = () => {
  const { isLoading } = useAppSelector((state) => state.contentSlice);
  const [post, setPost] = useState<Posts>();
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const getPost = async () => {
    dispatch(changeLoading(true));
    if(id === undefined) throw new Error("id is undefined!")
      await postsApi.getPost(parseInt(id)).then((res)=>{
        const result: Posts = {
          actived_at: res.data.actived_at,
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
            parent_id: res.data.category.parent_id,
          },
          content: res.data.content,
          id: res.data.id,
          img: res.data.img,
          likes: res.data.likes,
          shortcontent: res.data.shortcontent,
          title: res.data.title,
          views: res.data.views,
          user_id: res.data.user_id,
          author: res.data.author,
        };
  
        setPost({ ...result });
        dispatch(changeLoading(false));
      }).catch (() => {
        dispatch(changeLoading(false));
        dispatch(
          changeAlert({ message: "Post bilan xatolik yuz berdi", color: "red" })
        );
      }).finally(()=>{
        dispatch(changeLoading(false));
      }) 
  };

  const getCategories = async () => {
    try {
      const response: AxiosResponse<any> = await categoriesApi.getCategories();
      const result = response.data.results;
      setCategoryList(result);
    } catch (error: any) {
      dispatch(
        changeAlert({
          message: "Kategoriyalar bilan xatolik yuz berdi",
          color: "red",
        })
      );
    }
  };

  const getPosts = async () => {
    const response = await postsApi.allPostsByPage(1);
    setPostList(response.data.results);
  };

  const handleLike = async () => {
    if (id === undefined) return new Error("id is not defined!");
    setLike(id, true);
    setIsActive(true);
    if (!isActive) {
      await postsApi
        .postLike(id)
        .then(() => {
          getPost();
        })
        .catch(() => {
          dispatch(
            changeAlert({
              message: "Like tugmasini avval bosgansiz!",
              color: "red",
            })
          );
        });
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
      views: post.views,
      shortcontent: post.shortcontent,
      title: post.title,
      user_id: post.user_id,
      name: post.name,
      author: {
        first_name: post.author?.first_name,
      last_name: post.author?.last_name,
      created_at: post.author?.created_at,
      },
    };
    return (
      <div key={post.id}>
        <PostCard {...props} />
      </div>
    );
  });

  const categories = categoryList.map((category) => (
    <Link
      key={category.id}
      to={`/categories/${category.id}`}
      className="hover:text-blue-500 flex pl-4"
    >
      {category.name}
    </Link>
  ));

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getPosts();
    getPost();
    const like = getLike(`like`);
    if (like) {
      const parsedLike = JSON.parse(like);
      const filterLike = parsedLike.filter(
        (likeObj: any) => likeObj.post_id == id
      );
      filterLike.length > 0 ? setIsActive(true) : setIsActive(false);
    }
  }, [id]);

  return (
    <div className={`relative ${isLoading && "overflow-hidden"}`}>
      <div className="flex bg-white pt-16 postContainer max-md:block min-h-screen">
        {/* Post Sidebar Categories ... */}
        <div className="sidebar">
          <div className="flex flex-col  max-md:flex-row max-md:hidden max-md:text-xs gap-5 md:text-xl font-semibold">
            {categories}
          </div>
        </div>

        {/* Post Information Title,Category,Views ... */}
        <div className=" content  flex flex-col ">
          <h1 className="article_title max-md:text-3xl max-sm:text-2xl">
            {post?.title}
          </h1>
          <h1 className="text-sm w-full mb-4">{post?.shortcontent}</h1>
          <div className="flex gap-2 mb-4 justify-start items-center">
          <img src={Author} alt="author" className="w-12 h-12" />
          <span className="flex flex-col">
          <span className="flex gap-1 text-sm">
            <p>{post?.author?.first_name}</p>
            <p>{post?.author?.last_name}</p>
            </span>
            <span className="text-sm text-gray-500">{formatDateAuthor(post?.actived_at)}</span>
          </span>
          </div>
          <div className="article__page">
            <div className="post__flex flex gap-5">
              <span className="post-item__desc post text-base sm:text-sm cursor-pointer hover:scale-105 transition-all duration-100 ease-in-out">
                {post?.category?.name}
              </span>
              <span className="post-item__btn flex items-center text-base sm:text-sm">
                {formatDate(post?.actived_at)}
              </span>
              <span className="post-item__btn flex items-center text-base sm:text-sm gap-1">
                <MdVisibility size={18} color="#7CA9C2" />
                <span className="post-item__btn">{post?.views}</span>
              </span>
              <span
                onClick={handleLike}
                className="post-item__btn flex items-center text-base sm:text-sm gap-1 cursor-pointer"
              >
                {isActive ? (
                  <AiTwotoneLike size={18} color="#7CA9C2" />
                ) : (
                  <AiOutlineLike size={18} color="#7CA9C2" />
                )}
                {post?.likes}
              </span>
            </div>

            {/* Post Image ... */}
            <div className="flex items-center justify-center pb-10">
              {post?.img &&  <img
                src={`https://tech.nextlevelgroup.uz/${
                  post?.img ? post.img : ""
                }`}
                className="w-full rounded-xl object-cover hover:rounded-3xl transition-all duration-300 ease-in-out"
                alt="bikhoriy"
              />}
             
            </div>

            {/* Post Content ... */}
            <div
              className="post__content"
              dangerouslySetInnerHTML={{
                __html: post && post.content ? post.content : "",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 pl-14 max-lg:hidden pb-4 pr-4">
          {posts}
        </div>
      </div>
      {(isLoading || !postList.length) && <Loading />}
    </div>
  );
};
