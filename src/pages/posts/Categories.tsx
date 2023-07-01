import { useEffect, useState } from "react";
import { ArticleCard } from "../../components/posts/ArticleCard";
import { Posts } from "../../types/posts";
import { Link, useParams } from "react-router-dom";
import { changeAlert, changeSkeleteon } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ArticleCardSkeleton } from "../../components/skeletons/ArticleCardSkeleton";
import { categoriesApi } from "../../api/categoriesApi";
import BasicPagination from "../../components/pagination/Pagination";

function Categories() {
  const [catPosts, setCatPosts] = useState<Array<Posts>>([]);
  const [catList, setCatList] = useState<Array<Posts>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [reload,setReload] = useState<boolean>(false)
  const { skeleton } = useAppSelector((state) => state.contentSlice);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const getPosts = async (currentPage: number) => {
    dispatch(changeSkeleteon(true));
    if (catList[0] === undefined) return new Error("Cat List is empty");   
    await categoriesApi
      .getPostsByCategory(currentPage, id? id : catList[0].id)
      .then((res) => {
        if (res.status === 200) {
          setCatPosts(res.data.results);
          setTotalCount(Math.ceil(res.data.results.length / 10));
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      })
      .finally(() => {
        dispatch(changeSkeleteon(false));
      });
    // }
  };

  const getCategories = async () => {
    await categoriesApi
      .getCategories()
      .then((res) => {
        setReload(true)
        if (res.status === 200) {
          const data = res.data.results;
          setCatList(data);
        }
      })
      .catch((err) => {
        setReload(false)
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getPosts(page);
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
    getCategories();
    getPosts(1)
  }, [id,reload]);

  return (
    <div className="bg-slate-50 ">
      <div className="flex flex-wrap gap-2 contain pt-4">{categories}</div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 pt-8 pb-8 contain">
        {!skeleton && showCatPosts}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
        {skeleton && <ArticleCardSkeleton />}
      </div>

      {(!skeleton && catPosts.length > 0)&&<div className={`w-full flex justify-center items-center ${catPosts.length < 9 ? "absolute bottom-0" : ""}`}>
          <BasicPagination
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>}

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