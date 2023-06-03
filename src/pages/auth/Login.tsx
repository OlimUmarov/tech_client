import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createBrowserHistory } from "history";
import buttonNames from "../../components/buttons/buttonNames";
import schemaLogin from "../../lib/schemaLogin";
import authorization, { login } from "../../api/authApi";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { changeAlert, changeLogin,changeLoading } from "../../features/contentSlice";
import { setItem } from "../../lib/itemStorage";
import { LoadingButton } from "../../components/buttons/LoadingButton";

type FormData = yup.InferType<typeof schemaLogin>;

const Login = () => {
  const history = createBrowserHistory();
  const { showAlert } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (data: FormData) => {
    dispatch(changeLoading("loading"))
    const newSchema: login = {
      email: data.email,
      password: data.password,
    };
    await authorization
      .login(newSchema)
      .then((res) => {
        if (res.status === 200) {
          dispatch(changeLogin(true));
          setItem("access_token", res.data.token);
          history.replace("/");
          dispatch(changeAlert({ message: res.statusText, color: "green" }));
          dispatch(changeLoading("stable"))
        }
      })
      .catch((err) => {
        dispatch(
          changeAlert({ message: err.response.statusText, color: "red" })
        );
        dispatch(changeLoading("stable"))
      });
  };

 

  return (
    <div>
      <div className="bg-slate-50 min-h-screen flex flex-col items-center py-10 ">
        <section className=" w-[600px] max-sm:max-w-[300px]   flex flex-col justify-center items-center">
          <h1 className="text-2xl max-md:text-xl  font-semibold pb-2">
            Tech ga kirish
          </h1>
          <p className="text-md max-md:text-base text-gray-500 pb-6">
            Qaytib kelganingizdan xursandmiz! Malumotlaringizni kiriting.
          </p>
        </section>

        <section className="flex flex-col w-[450px] max-md:w-96  max-sm:w-80 max-sm:px-4 bg-white border drop-shadow-xl border-slate-200 p-6 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User email */}
            <div className="flex flex-col gap-1 h-24">
              <label className="label max-md:text-sm">E-mail</label>
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
            <div className="flex gap-2 h-24 mb-4">
              <span className="w-full flex flex-col gap-1">
                <label className="label max-md:text-sm">Parol</label>
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

            <LoadingButton
            onClick={handleSubmit(onSubmit)}
            title={buttonNames.name.login}
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
