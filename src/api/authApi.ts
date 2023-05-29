import { publicAxios } from "../lib/publicAxios";

export type register = {
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  city_id: number;
  birthday: Date;
  email: string;
  password: string;
}
export type login = {
  email: string;
  password: string;
}


 const authorization = {
  register: async (data: register) => await publicAxios.post("/users", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      city_id: data.city_id,
      birthday: data.birthday,
      email: data.email,
      gender: data.gender,
      password: data.password,
    }),

  login: async (data: login) => await publicAxios.post("/users/login", {
      email: data.email,
      password: data.password,
    }),
};

export default authorization


