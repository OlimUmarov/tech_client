import privateAxios from "../lib/privateAxios";


export const categories = {
    getCategories: async() => await privateAxios.get('/categories')
}