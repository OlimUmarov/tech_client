import { useEffect, useState } from "react";
import { postsApi } from "../../api/postsApi";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts, catListType } from "../../types/posts";
import { Link, useParams } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";
import { categoriesApi } from "../../api/categoriesApi";

function Categories() {
  const [catPosts, setCatPosts] = useState<Array<Posts>>([]);
  const [catList, setCatList] = useState<Array<catListType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  // const [fetching, setFetching] = useState<boolean>(true);
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const getPosts = async (cat_id: string | undefined) => {
    const count: number = Math.ceil(totalCount);

    // if (fetching && currentPage <= count) {
      dispatch(changeSkeleteon(true));
      await postsApi
        .allPosts(currentPage)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.results;
            let filteredPost;
            if (cat_id) {
              filteredPost = data.filter((post) => post.category == id);
              setCatPosts(filteredPost);
              setCurrentPage((prev) => prev + 1);
              setTotalCount(filteredPost.length);
            } else {
              filteredPost = data.filter(
                (post) => post.category == data[0].category
              );
              setCatPosts(filteredPost);
              setCurrentPage((prev) => prev + 1);
              setTotalCount(res.data.totalCount);
            }
          }
        })
        .catch((err) => {
          dispatch(
            changeAlert({ message: err.response.statusText, color: "red" })
          );
        })
        .finally(() => {
          // setFetching(false);
          dispatch(changeSkeleteon(false));
        });
    }
  // };

  // const scrollHandler = (e) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     100
  //   ) {
  //     setFetching(true);
  //   }
  // };

  const getCategories = async () => {
    await categoriesApi
      .getCategories()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.results;
          setCatList(data);
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

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
      views: post.views,
      name: post.name,
      user_id: post.user_id,
    };
    return (
      <Link to={`/post/${post.id}`} key={post.id}>
        <ArticleCard {...props} />
      </Link>
    );
  });

  const categories: JSX.Element[] = catList.map((category) => {
    return (
      <Link
        to={`/categories/${category.id}`}
        key={category.id}
        className="py-0.5 px-2 border-0 text-sm transition-all duration-300 ease-in-out rounded-full bg-blue-300 hover:bg-blue-400 text-white cursor-pointer"
      >
        {category.name}
      </Link>
    );
  });

  useEffect(() => {
    getPosts(id);
    getCategories();
    // document.addEventListener("scroll", scrollHandler);
    // return function () {
    //   document.removeEventListener("scroll", scrollHandler);
    // };
  }, [id]);

  return (
    <div className="bg-slate-50 ">
      <div className="flex flex-wrap gap-2 contain pt-4">{categories}</div>

      {catPosts.length ? (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 pt-8 pb-8 contain">
          {showCatPosts}
        </div>
      ) : (
        <div className="pt-10">{skeleton && <ArticleCardSkeleton />}</div>
      )}
      {!catPosts.length && !skeleton && (
        <div className="contain flex flex-col justify-center items-center pt-20">
          <div>
            <h1 className="w-96 mb-4 text-2xl font-medium">
              Bu kategoriyada hali post qoshilmagan
            </h1>
            <p className="w-96">
              Kategoriyaga post qoshmoqchi bo'lsangiz, iltimos post yaratish
              tugmasini bosing, va yaratmoqchi bolgan postingizni ushbu
              kategoriyani tanlagan holda yarating.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


export default Categories;
