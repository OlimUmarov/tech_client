import { publicAxios } from "../lib/publicAxios";

interface AuthData {
  first_name: string;
  last_name: string;
  phone: string;
  city_id: number;
  birthday: Date;
  email: string;
  password: string;
}

export const categories = {
  register: async (data: AuthData) => await publicAxios.post("/users", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      city_id: data.city_id,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
    }),

  login: async (data: AuthData) => await publicAxios.post("/users", {
      email: data.email,
      password: data.password,
    }),
};
