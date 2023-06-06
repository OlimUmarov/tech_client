import { useEffect, useState } from "react";
import { CreatePosts } from "../../components/posts/CreatePosts"
import { changeAlert, changeLoading } from "../../features/contentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Category, categoriesApi } from "../../api/categoriesApi";
import { Loading } from "../../components/loading/Loading";

export const CreatePost = () => {
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.contentSlice);

  const getCategories = async () => {
    dispatch(changeLoading(true))
    await categoriesApi
      .getCategories()
      .then((res) => {
        setCategoryList(res.data.results);
      })
      .catch((err) => {
        dispatch(changeLoading(false))
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      }).finally(()=> {
        dispatch(changeLoading(false))
      })
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-white">
      <div className=" contain">
        <CreatePosts categoryList={categoryList}/>
        {(isLoading || !categoryList) &&  <Loading/>}
      </div>
    </div>
  )
}