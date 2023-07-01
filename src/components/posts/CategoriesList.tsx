import { useEffect, useState } from "react";
import { Posts } from "../../types/posts";
import { categoriesApi } from "../../api/categoriesApi";
import { useAppDispatch } from "../../app/hook";
import { changeAlert } from "../../features/contentSlice";
import { Link, useLocation } from "react-router-dom";

export const CategoriesList = () => {
  const [catList, setCatList] = useState<Array<Posts>>([]);
  const [catId, setCatId] = useState<string>();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    getCategories();
    setCatId(location.pathname);
  }, [location]);

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

  const categories: JSX.Element[] = catList.map((category) => {
    return (
      <Link
        to={`/categories/${category.id}`}
        key={category.id}
        className={`py-1 px-3 border-0 text-sm transition-all duration-300 ease-in-out rounded-lg hover:bg-black hover:text-white cursor-pointer
            ${
              catId === `/categories/${category.id}`
                ? "bg-black text-white"
                : "bg-gray-200 text-grey-500"
            }
            `}
      >
        {category.name}
      </Link>
    );
  });

  return <div className="flex flex-wrap gap-2 contain pt-4">{categories}</div>;
};
