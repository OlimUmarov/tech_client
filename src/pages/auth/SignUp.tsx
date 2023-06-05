import { useState, useEffect, InputHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../lib/schema";
import DatePicker from "react-multi-date-picker";
import InputMask from "react-input-mask";
import * as yup from "yup";
import Gender from "../../components/auth/Gender";
import authorization, { register } from "../../api/authApi";
import { Cities, citiesApi } from "../../api/citiesApi";
import { useAppDispatch } from "../../app/hook";
import { changeAlert } from "../../features/contentSlice";
import buttonNames from "../../components/buttons/buttonNames";
import Button from "../../components/buttons/Button";

// type Props = {
//   props: Props
// };
type FormData = yup.InferType<typeof schema>;

const SignUp = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>("erkak");
  const [citiesList, setCitiesList] = useState<Array<object>>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    await citiesApi
      .getCities()
      .then((res) => {
        if (res.status === 200) {
          setCitiesList(res.data.results);
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
  };

  // Send Form data to Server
  const onSubmit = async (data: FormData) => {    
    const newSchema: register = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: gender,
      phone: data.phone,
      city_id: data.city_id,
      birthday: date,
      email: data.email,
      password: data.password,
    };

    await authorization
      .register(newSchema)
      .then((res) => {
        if (res.status === 200) {
          dispatch(changeAlert({ message: res.statusText, color: "green" }));
          navigate("/login");
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
      });
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
      <div className="bg-slate-50 min-h-screen flex flex-col items-center py-10 px-10 ">
        <section className="max-md:w-96 max-sm:w-80  w-[600px]  flex flex-col justify-center items-center">
          <h1 className="text-2xl max-md:text-xl  font-semibold pb-2">
            Ro'yxatdan o'tish{" "}
          </h1>
          <p className="text-md max-md:text-base text-gray-500 pb-6">
            Ro'yxatdan o'tish uchun, iltimos ma'lumotlaringnizni kiriting
          </p>
        </section>

        <section className="flex flex-col w-[450px] max-md:w-96  max-sm:w-80 bg-white border drop-shadow-xl border-slate-200 p-6 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Names */}
            <div className="flex max-md:flex-col ">
              <span className="max-md:w-full max-md:flex max-md:pr-0 w-1/2 h-24 flex flex-col gap-1 pr-1">
                <label className="label max-md:text-sm">Ism</label>
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

              <span className="w-1/2 max-md:w-full flex flex-col h-24 gap-1">
                <label className="label max-md:text-sm">Familiyasi</label>
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
            <div className=" flex w-full max-md:flex-col ">
              <span className="relative w-2/3 h-24 max-md:w-full max-md:pr-0 flex flex-col gap-1 pr-1.5">
                <label className="label">Tug'ilgan sana</label>
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

              <span className="w-2/3 h-24 flex flex-col gap-1">
                <label className="label">Jinsi</label>
                <Gender setGender={handleGender} />
              </span>
            </div>

            {/* User phone & city */}
            <div className="flex w-full max-md:flex-col">
              <span className="w-2/3 h-24 max-md:w-full max-md:pr-0 flex flex-col gap-1 pr-1">
                <label className="label">Telefon raqami</label>

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

              <span className="relative w-2/3 h-24 max-md:w-full flex flex-col gap-1">
                <label className="label">Shahar</label>
                <select
                  {...register("city_id")}
                  className={`select input border border-white pl-4 ${
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
            <div className="flex h-24 flex-col max-md:flex-col">
              <label className="label">E-mail</label>
              <input
                type="email"
                {...register("email")}
                placeholder="E-mail"
                className={`input border border-white pl-4 ${
                  errors.email?.message && "border-red-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs ">{errors.email.message}</p>
              )}
            </div>

            {/* User password */}
            <div className="flex h-24 max-md:flex-col">
              <span className="w-full flex flex-col gap-1">
                <label className="label">Parol</label>
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

            {/* User Confirm password */}
            <div className="flex mb-4 max-md:flex-col">
              <span className="w-full flex h-24 flex-col gap-1">
                <label className="label">Parolni tasdiqlang</label>
                <input
                  type="password"
                  placeholder="********"
                  {...register("confirm")}
                  className={`input border border-white pl-4 ${
                    errors.password?.message && "border-red-300"
                  }`}
                />
                {errors.confirm && (
                  <p className="text-red-500 text-xs ">
                    {errors.confirm.message}
                  </p>
                )}
              </span>
            </div>
            
            <div className="flex flex-col gap-4 text-center">
            <Button
            onClick={handleSubmit(onSubmit)}
            title={buttonNames.name.signUp}
            width={true}
            height={true}
            />

            <div className="flex flex-wrap w-full justify-center">
            <span className="text-black font-medium pr-1">Akkauntingiz bormi?</span> 
            <a href="/login" className="text-blue-500 font-medium">Kirish</a>
            </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
