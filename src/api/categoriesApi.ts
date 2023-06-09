import { publicAxios } from "../lib/publicAxios";

export type Category = {
    id: number,
    name: string,
    parent_id: number | null
}

export const categoriesApi = {
    getCategories: async() => await publicAxios.get('/categories'),
    getPostsByCategory: async (page: number,cat_id: number | string) => await publicAxios.get(`/posts?isactive=true&page=${page}&orderBy=created_at&orderDirection=DESC&category=${cat_id}`),
}