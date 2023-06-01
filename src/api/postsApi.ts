import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";

export type Post = {
  id: number
  title: string;
  shortContent: string;
  content: string;
  category: {
    id: string,
    name: string,
    paren_id: number | null
  };
  user_id?: number;
  img:string;
}

export const postsApi = {
  allPosts: async () => await publicAxios.get(`/posts`),
  allPostsByPage: async (page: number) => await publicAxios.get(`/posts?page=${page}`),
  getPost: async (id: number) => await publicAxios.get(`/posts/${id}`),
  postPost: async (data:FormData) => await privateAxios.post("/posts", data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  putPost: async (id: number,data:FormData) => await privateAxios.put(`/posts/my/${id}`, data),
  getMyPosts: async () => await privateAxios.get("/posts/my"),
  getMyPost: async (id: number) => await privateAxios.get(`/posts/my/${id}`),
  delMyPost: async (id: number) => await privateAxios.delete(`/posts/my/${id}`),

  getLikes: async () => await publicAxios.get(`/posts/likes`),
  postLike: async () => await privateAxios.post(`/posts/like`),

};
