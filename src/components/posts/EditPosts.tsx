import { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";
import { Post, postsApi } from "../../api/postsApi";
import Button from "../buttons/Button";
import { Category, categoriesApi } from "../../api/categoriesApi";
import { imageUrlToFile } from "../../utils/imgUrlToFile";

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

interface Props {
  post: Post;
}

export const EditPosts: React.FC<Props> = ({ post }) => {
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [title, setTitle] = useState<string>("");
  const [shortContent, setShortContent] = useState<string>("");
  const [cat_id, setCat_id] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reload,setReload] = useState<boolean>(false)
  const [convertedImage,setConvertedImage] = useState<File | null>(null)
  const dispatch = useAppDispatch();

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
    if (!convertedImage)
      return dispatch(
        changeAlert({ message: "Xatolik yuz berdi!", color: "red" })
      );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorContent);
    formData.append("category", cat_id);
    formData.append("shortContent", shortContent);
    if(!previewUrl || !selectedFile){
      formData.append("img", convertedImage);
    }else{
      formData.append("img", selectedFile);
    }  
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
        
    await postsApi
      .putPost(post.id,formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(changeAlert({ message: res.statusText, color: "green" }));
          setTitle("");
          setEditorContent("");
          setCat_id("");
          setShortContent("");
          setSelectedFile(null);
          setReload(true)
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setSelectedFile(e.currentTarget.files[0]);
      const file = e.currentTarget.files && e.currentTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCat_id(selectedValue);
  };

  const getUserData = () => {
    if (!post)
      return dispatch(
        changeAlert({
          message: "Post kelishida xatolik yuz berdi!",
          color: "red",
        })
      );
    setTitle(post.title || "");
    setShortContent(post.shortContent || "");
    if (!post.category)
      return new Error("Kategoriyalar bilan xatolik yuz berdi!");
    setCat_id(post.category.id || "");
    setEditorContent(post.content || "");
  };

  async function loadImage() {
    if (!post.img) return new Error("Image error!");
    const image = await imageUrlToFile(
      `http://tech.nextlevelgroup.uz/${post.img}`,
      "image"
    );
    setConvertedImage(image)
   
  }

  const categories = categoryList.map((category: Category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  useEffect(() => {
    getCategories();
    if (post) {
      getUserData();
      loadImage();
    }
  }, [post,reload]);

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
          className="w-full p-3 text-sm border border-gray-400 outline-none focus:border-blue-500"
        >
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
      <div className="pt-10 flex flex-col justify-center items-start gap-4">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected" />
        ) : (
          <img
            src={`http://tech.nextlevelgroup.uz/${post.img}`}
            className="border-0 rounded-md"
          />
        )}

        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Agar rasimni o'zgartirmoqchi bolsangiz, pasdaki tugmani bosing. 
        </h1>
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
