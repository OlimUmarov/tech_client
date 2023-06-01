import { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";
import { postsApi } from "../../api/postsApi";
import Button from "../buttons/Button";
import { Category, categoriesApi } from "../../api/categoriesApi";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export const CreatePosts = () => {
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [title, setTitle] = useState<string>("");
  const [shortContent, setShortContent] = useState<string>("");
  const [cat_id, setCat_id] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  const getCategories = async () => {
    await categoriesApi
      .getCategories()
      .then((res) => {
        setCategoryList(res.data.results);
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

  const sendPost = async () => {
    if (!file)
      return dispatch(
        changeAlert({ message: "Xatolik yuz berdi!", color: "red" })
      );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorContent);
    formData.append("category", cat_id);
    formData.append("shortContent", shortContent);
    formData.append("img", file);

      await postsApi
        .postPost(formData)
        .then((res) => {
          if (res.status === 200) {
            dispatch(changeAlert({ message: res.statusText, color: "green" }));
              setTitle("")
            setEditorContent("")
            setCat_id("")
            setShortContent("")
            setFile(null)
          }
        })
        .catch((err) => {
          dispatch(
            changeAlert({ message: err.response.statusText, color: "red" })
          );
        })
        
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setCat_id(selectedValue);
  };


  const categories = categoryList.map((category: Category) => {
    return (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    );
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="content pt-10 pb-10">
      <h1 className="text-3xl font-medium max-md:text-2xl max-sm:text-xl pb-6">
        Post Yaratish
      </h1>

      {/* Set  Title  */}
      <div className="mb-6 flex flex-col gap-2 ">
        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Sarlavha
        </h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Postni sarlavhasini kiriting"
          className="w-full p-3 text-sm border border-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Set  ShortContent  */}
      <div className="mb-6 flex flex-col gap-2 ">
        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Kisqacha ma'lumot
        </h1>
        <textarea
          value={shortContent}
          onChange={(e) => setShortContent(e.target.value)}
          placeholder="Post nima haqidaligini yozing"
          className="w-full h-40 max-md:h-20 p-3 text-sm border border-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Set  ShortContent  */}
      <div className="mb-6 flex flex-col gap-2 ">
        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Kategoriyalardan birini tanlang
        </h1>
        <select 
        value={cat_id}
        onChange={handleCategoryChange}
        className="w-full p-3 text-sm border border-gray-400 outline-none focus:border-blue-500">
          <option value="" hidden>
            Kategoriyalar
          </option>
          {categories}
        </select>
      </div>

      {/* Set Content  */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Content
        </h1>
        <div className="h-96 max-sm:h-80">
          <ReactQuill
          value={editorContent}
            onChange={(e: any) => setEditorContent(e)}
            className="h-full"
            modules={quillModules}
            formats={quillFormats}
            theme="snow"
          />
        </div>
      </div>

      {/* Set Image  */}
      <div className="pt-10">
        <input type="file" onChange={handleSelectFile} />
      </div>

      <div className="pt-10">
        <Button
          title="Malumotlarni yuborish"
          active={true}
          onClick={sendPost}
        />
      </div>
    </div>
  );
};
