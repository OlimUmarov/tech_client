import privateAxios from "../lib/privateAxios";
import { publicAxios } from "../lib/publicAxios";

interface Cities  {
    name: string,
}

export const categories = {
  
  getCities: async () => await publicAxios.get("/cities"),

  postCity: async (city: Cities) => await privateAxios.post("/cities", {name: city.name}),
  delCity: async (id: number) => await privateAxios.post(`/cities:${id}`),
};
