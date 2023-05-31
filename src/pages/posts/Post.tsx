import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { AxiosResponse } from "axios";
import { Posts } from "../../types/posts";
import { Category, categoriesApi } from "../../api/categoriesApi";
import { PostCard } from "../../components/posts/PostCard";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../components/posts/formatDate";

export const Post = () => {
  const [post, setPost] = useState<Posts>();
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [postList, setPostList] = useState<Array<Posts>>([]);
  const { id } = useParams();

  const getPost = async () => {
    try {
      const response: AxiosResponse<any> = await postsApi.getPost(id);
      const result: Posts = {
        actived_at: response.data.actived_at,
        category: {
          id: response.data.category.id,
          name: response.data.category.name,
          parent_id: response.data.category.parent_id,
        },
        content: response.data.content,
        id: response.data.id,
        img: response.data.img,
        likes: response.data.number,
        shortcontent: response.data.shortcontent,
        title: response.data.title,
        user_id: response.data.user_id,
      };

      setPost({ ...result });
    } catch (error: any) {
      console.log("getPost" + error.message);
    }
  };

  const getCategories = async () => {
    try {
      const response: AxiosResponse<any> = await categoriesApi.getCategories();
      const result = response.data.results;
      setCategoryList(result);
    } catch (error: any) {
      console.log("getCategories" + error.message);
    }
  };

  const getPosts = async () => {
    const response = await postsApi.allPostsByPage(1);
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
      name: post.name,
    };
    return (
      <Link key={post.id} to={`/post/${post.id}`}>
        <PostCard {...props} />
      </Link>
    );
  });

  const categories = categoryList.map((category) => (
    <Link
      key={category.id}
      to={`/categories/${category.id}`}
      className="hover:text-blue-500 flex"
    >
      {category.name}
    </Link>
  ));

  useEffect(() => {
    getPost();
    getPosts();
    getCategories();
  }, [id]);

  return (
    <div>
      <div className="flex bg-white pt-16 postContainer max-md:block">
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
          <h1 className="text-sm w-full mb-6">{post?.shortcontent}</h1>
          <div className="article__page">
            <div className="post__flex flex gap-5">
              <span className="post-item__desc post text-base sm:text-sm cursor-pointer hover:scale-105 transition-all duration-100 ease-in-out">
                {post?.category?.name}
              </span>
              <span className="post-item__btn flex items-center text-base sm:text-sm">
                {formatDate(post?.actived_at)}
              </span>
            </div>

            {/* Post Image ... */}
            <div className="flex items-center justify-center pb-10">
              <img
                src={`http://tech.nextlevelgroup.uz/${post?.img}`}
                className="w-full rounded-xl hover:rounded-3xl transition-all duration-300 ease-in-out"
                alt="bikhoriy"
              />
            </div>

            {/* Post Content ... */}
            <div
              className="post__content"
              dangerouslySetInnerHTML={{
                __html:
                  post && post.content
                    ? post.content
                    : `<div>Page not found</div>`,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 pl-14 max-lg:hidden pb-4">
          {posts}
        </div>
      </div>
    </div>
  );
};
