import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";

interface Posts {
  title: string;
  shortContent: string;
  content: string;
  category: number;
  user_id: number;
}

export const postsApi = {
  allPosts: async () => await publicAxios.get("/posts"),
  getPosts: async (id: number) => await publicAxios.get(`/posts:${id}`),
  postPost: async (data: Posts) => await privateAxios.post("/users", {
      title: data.title,
      shortContent: data.shortContent,
      content: data.content,
      category: data.category,
      user_id: data.user_id,
    }),
  getMyPosts: async () => await privateAxios.get("/posts/my"),
  getMyPost: async (id: number) => await privateAxios.get(`/posts/my:${id}`),
  delMyPost: async (id: number) => await privateAxios.post(`/posts/my:${id}`),

  getLikes: async () => await publicAxios.get(`/posts/likes`),
  postLike: async () => await privateAxios.post(`/posts/like`),

};
