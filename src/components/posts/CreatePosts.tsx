import { ChangeEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { changeAlert, changeLoading } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";
import { postsApi } from "../../api/postsApi";
import Button from "../buttons/Button";
import { catListType } from "../../types/posts";

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

type Props = {
  categoryList: Array<catListType>
}

type categoryType = {
  id: number,
  name: string
}

export const CreatePosts = ({categoryList}:Props) => {
  const [title, setTitle] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shortContent, setShortContent] = useState<string>("");
  const [cat_id, setCat_id] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

const navigate = useNavigate()


  const sendPost = async () => {
    dispatch(changeLoading(true));

    if (!file){
      dispatch(
        changeAlert({ message: "Xatolik yuz berdi!", color: "red" })
      );
      dispatch(changeLoading(false));
    }
    if(file === null) throw new Error("file is null")
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
          setTitle("");
          setEditorContent("");
          setCat_id("");
          setShortContent("");
          setFile(null);
          dispatch(changeLoading(false));
          navigate("/my-posts")
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
        dispatch(changeLoading(false));
      });
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);
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

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  const handleCategoryChange = (event: { target: { value: any; }; }) => {
    const selectedValue = event.target.value;
    setCat_id(selectedValue);
  };

  const categories = categoryList.map((category:categoryType) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });


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
          placeholder="Post sarlavhasini kiriting"
          className="w-full p-3 text-sm border border-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Set  ShortContent  */}
      <div className="mb-6 flex flex-col gap-2 ">
        <h1 className="text-md font-medium max-md:text-base max-sm:text-sm">
          Qisqacha ma'lumot
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
        Kontent
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
       <div className="pt-10 mb-10 flex flex-col justify-center items-start gap-4">
       {previewUrl && <img src={previewUrl} alt="Selected" className="w-[300px] h-[300px] object-cover"/>  }     
        {/* <input type="file" onChange={handleSelectFile} /> */}
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png" // Specify accepted file extensions
        onChange={handleSelectFile}
      />
      <button onClick={handleButtonClick} 
      className="p-1 bg-slate-100 rounded-md border border-blue-500 hover:bg-slate-200">Rasmni tanlang</button>
      </div>
        <Button title="Yuborish" onClick={sendPost} active={true} />
    </div>
  );
};
