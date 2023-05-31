import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";

interface Posts {
  title: string;
  shortContent?: string;
  content: string;
  category: number;
  user_id?: number;
  img?:string;
}

export const postsApi = {
  allPosts: async () => await publicAxios.get(`/posts`),
  allPostsByPage: async (page: number) => await publicAxios.get(`/posts?page=${page}`),
  getPost: async (id: string |undefined) => await publicAxios.get(`/posts/${id}`),
  postPost: async (data:FormData) => await privateAxios.post("/posts", data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getMyPosts: async () => await privateAxios.get("/posts/my"),
  getMyPost: async (id: string | undefined) => await privateAxios.get(`/posts/my:${id}`),
  delMyPost: async (id: string|undefined) => await privateAxios.post(`/posts/my:${id}`),

  getLikes: async () => await publicAxios.get(`/posts/likes`),
  postLike: async () => await privateAxios.post(`/posts/like`),

};
