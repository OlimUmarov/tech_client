import privateAxios from "../lib/privateAxios";

export type Category = {
    id: number,
    name: string,
    parent_id: number | null
}

export const categoriesApi = {
    getCategories: async() => await privateAxios.get('/categories')
}