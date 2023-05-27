import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../lib/schema";
import DatePicker from "react-multi-date-picker";
import InputMask from "react-input-mask";
import * as yup from "yup";
import Button from "../../components/buttons/Button";
import Gender from "../../components/auth/Gender";
import buttonNames from "../../components/buttons/buttonNames";
import authorization, { AuthData } from "../../api/auth";
import { AxiosResponse } from "axios";
import { Cities, cities } from "../../api/cities";

// type Props = {
//   props: Props
// };
type FormData = yup.InferType<typeof schema>;

const SignUp = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>("");
  const [citiesList, setCitiesList] = useState<Array<object>>([]);
  const navigate = useNavigate();

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue;
  };

  const hadleDate = (date: any) => {
    setDate(date.toDate());
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const getCities = async () => {
    const response: AxiosResponse<any> = await cities.getCities();
    setCitiesList(response.data.results);
  };

  // Send Form data to Server
  const onSubmit = async (data: FormData) => {
    
    console.log("OnSubmit");

    const newSchema: AuthData = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: gender,
      phone: data.phone,
      city_id: data.city_id,
      birthday: date,
      email: data.email,
      password: data.password,
    };

    try {
      const response: AxiosResponse<any> = await authorization.register(
        newSchema
      );
      const password: string = response.data.password;
      localStorage.setItem("access_token", password);
      navigate("/sign-in");
      console.log(response.data);
      console.log(response.data.password);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const options = citiesList.map((city: Cities) => {
    return (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    );
  });

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <div className="bg-slate-50 min-h-screen flex flex-col items-center py-10 ">
        <h1 className="text-2xl font-semibold pb-2">Ro'yxatdan o'tish </h1>
        <p className="text-md text-gray-500 pb-6">
          Ro'yxatdan o'tish uchun, iltimos ma'lumotlaringnizni kiriting
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col w-[450px] bg-white border drop-shadow-xl border-slate-200 p-6 rounded-lg">
            <main>
              {/* User Names */}
              <div className="flex h-24 gap-2 ">
                <span className="w-1/2 flex flex-col gap-1">
                  <label htmlFor="first_name" className="label">
                    Ism
                  </label>
                  <input
                    type="text"
                    {...register("first_name")}
                    placeholder="Ism"
                    className={`input border border-white pl-4 ${
                      errors.first_name?.message && "border-red-300"
                    }`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs ">
                      {errors.first_name.message}
                    </p>
                  )}
                </span>

                <span className="w-1/2 flex flex-col gap-1">
                  <label htmlFor="last_name" className="label">
                    Familiyasi
                  </label>
                  <input
                    type="text"
                    {...register("last_name")}
                    placeholder="Familiyasi"
                    className={`input border border-white pl-4 ${
                      errors.last_name?.message && "border-red-300"
                    }`}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs ">
                      {errors.last_name.message}
                    </p>
                  )}
                </span>
              </div>

              {/* User birthday & gender */}
              <div className=" flex gap-2 w-full h-24 ">
                <span className="relative w-2/3 flex flex-col gap-1 ">
                  <label htmlFor="birthday " className="label">
                    Tug'ilgan sana
                  </label>
                  <DatePicker
                    format="YYYY.MM.DD"
                    value={date}
                    // {...register("birthday")}
                    style={{
                      backgroundColor: "#F5F7F9",
                      height: "47px",
                      width: "100%",
                      borderRadius: "8px",
                      border: "0px",
                      fontSize: "14px",
                      padding: "3px 10px",
                    }}
                    onChange={hadleDate}
                    placeholder="Tug'ilgan sana "
                  />
                </span>

                <span className="w-2/3 flex flex-col gap-1">
                  <label htmlFor="last_name" className="label">
                    Jinsi
                  </label>
                  <Gender setGender={handleGender} />
                </span>
              </div>

              {/* User phone & city */}
              <div className="flex gap-2 w-full h-24">
                <span className="w-2/3 flex flex-col gap-1">
                  <label htmlFor="phone" className="label">
                    Telefon raqami
                  </label>
                  <InputMask
                    mask="+\9\98(99) 999-99-99"
                    maskChar="_"
                    placeholder="+998(__) ___-__-__ "
                    {...register("phone", {
                      valueAsNumber: false,
                      setValueAs: formatPhoneNumber,
                    })}
                    className={`input border border-white pl-4 ${
                      errors.password?.message && "border-red-300"
                    }`}
                  >
                    {(
                      inputProps: React.InputHTMLAttributes<HTMLInputElement>
                    ) => <input {...inputProps} />}
                  </InputMask>
                  {errors.phone && (
                    <p className="text-red-500 text-xs ">
                      {errors.phone.message}
                    </p>
                  )}
                </span>

                <span className="relative w-2/3 flex flex-col gap-1">
                  <label htmlFor="city_id" className="label">
                    Shahar
                  </label>
                  <select
                    {...register("city_id")}
                    className={` input border border-white pl-4 ${
                      errors.password?.message && "border-red-300"
                    }`}
                  >
                    <option value="" hidden>
                      Shahar
                    </option>
                    {options}
                  </select>
                  {errors.city_id && (
                    <p className="text-red-500 text-xs ">
                      {errors.city_id.message}
                    </p>
                  )}
                </span>
              </div>

              {/* User email */}
              <div className="flex flex-col gap-1 h-24">
                <label htmlFor="email" className="label">
                  E-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="E-mail"
                  className={`input border border-white pl-4 ${
                    errors.email?.message && "border-red-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs ">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* User password */}
              <div className="flex gap-2 h-24">
                <span className="w-full flex flex-col gap-1">
                  <label htmlFor="password" className="label">
                    Parol
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    {...register("password")}
                    className={`input border border-white pl-4 ${
                      errors.password?.message && "border-red-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs ">
                      {errors.password.message}
                    </p>
                  )}
                </span>
              </div>

              {/* User password */}
              <div className="flex gap-2 mb-6 h-24">
                <span className="w-full flex flex-col gap-1">
                  <label htmlFor="checkPassword" className="label">
                    Parolni tasdiqlang
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    {...register("checkPassword")}
                    className={`input border border-white pl-4 ${
                      errors.password?.message && "border-red-300"
                    }`}
                  />
                  {errors.checkPassword && (
                    <p className="text-red-500 text-xs ">
                      {errors.checkPassword.message}
                    </p>
                  )}
                </span>
              </div>

              <div className="">
                <button type="submit">submit</button>
                <Button
                  title={buttonNames.name.signUp}
                  active={true}
                  width={true}
                  type="submit"
                />
              </div>
            </main>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
