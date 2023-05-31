import { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { changeAlert } from "../../features/contentSlice";
import { useAppDispatch } from "../../app/hook";
import { postsApi } from "../../api/postsApi";
import { AxiosResponse } from "axios";
import Button from "../buttons/Button";

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

export const TextEditor = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  
  const sendPost = async () => {
    if (!file) return new Error("sss");
    
    const formData = new FormData();
    formData.append("title", "Bu Test Shaklida yuborildi!");
    formData.append("content", editorContent);
    formData.append("category", '1');
    formData.append("shortContent", "Tarix, Geografiya Tibbiyot sohasidadagi asarlaridan dunyo foydalanib kelmoqda");
    formData.append("img", file);

    // const response: AxiosResponse<any> = await postsApi.postPost(formData);
    // if (response.status === 200) {
    //   dispatch(changeAlert({ message: response.statusText, color: "green" }));
    // }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log(formData.get("img"));
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);
    }
  };

  return (
    <div className="content pt-8 mb-10 ">
      <h1 className="text-2xl font-medium max-md:text-xl max-sm:text-lg ">
        Create Content
      </h1>
      <input type="file" onChange={handleSelectFile} />
      <ReactQuill
        onChange={(e: any) => setEditorContent(e)}
        className="bg-white"
        modules={quillModules}
        formats={quillFormats}
        theme="snow"
      />
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
