import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";
import { orderByType } from "../types/posts";

export type Post = {
  id: number
  title: string;
  shortcontent: string;
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
  allPosts: async (page: number) => await publicAxios.get(`/posts?isactive=true&page=${page}`),
  filteredPosts: async (orbderBy: orderByType,page: number) => await publicAxios.get(`/posts?isactive=true&page=${page}&orderBy=${orbderBy}&orderDirection=DESC`),
  paginationPosts: async (page: number) => await publicAxios.get(`/posts?page=${page}`),
  allPostsByPage: async (page: number) => await publicAxios.get(`/posts?isactive=true&page=${page}&orderBy=created_at&orderDirection=DESC`),
  getPost: async (id: number) => await publicAxios.get(`/posts/${id}`),
  postPost: async (data:FormData) => await privateAxios.post("/posts", data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  putPost: async (id: number,data:FormData) => await privateAxios.put(`/posts/my/${id}`, data),
  getMyPosts: async () => await privateAxios.get("/posts/my/?orderBy=created_at&orderDirection=DESC"),
  getMyPost: async (id: number) => await privateAxios.get(`/posts/my/${id}`),
  delMyPost: async (id: number) => await privateAxios.delete(`/posts/my/${id}`),

  getLikes: async () => await publicAxios.get(`/posts/likes`),
  postLike: async (post_id:number | string) => await privateAxios.post(`/posts/like/?post_id=${post_id}`),

};
