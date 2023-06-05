import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";

export type Category = {
    id: number,
    name: string,
    parent_id: number | null
}

export const categoriesApi = {
    getCategories: async() => await privateAxios.get('/categories'),
    getPostsByCategory: async (page: number,cat_id: number | string) => await publicAxios.get(`/posts?page=${page}&orderBy=created_at&orderDirection=DESC&category=${cat_id}`),
}