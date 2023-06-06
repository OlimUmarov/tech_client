import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { getItem, getLogin, setLogin } from "./lib/itemStorage";
import privateAxios from "./lib/privateAxios";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { changeAlert } from "./features/contentSlice";
import { Loading } from "./components/loading/Loading";

function App() {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.contentSlice);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const token = getItem("access_token");

  const fetchCheckToken = async () => {
    try {
      const response = await privateAxios.get("/posts/my");
      if (response.status === 200) {
        setLogin("isLogin", "true");
        setIsLogedIn(true);
      }
    } catch (error: any) {
      dispatch(changeAlert({ message: error.response.data, color: "red" }));
      setLogin("isLogin", "false");
      setIsLogedIn(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCheckToken();
      const getIsLogin = getLogin("isLogin");
      getIsLogin === "true" ? setIsLogedIn(true) : setIsLogedIn(false);
    } else {
      setIsLogedIn(false);
    }
  }, [token, isLogedIn, isLogin]);

  if (isLogedIn) {
    return (
      <RouterProvider
        key={2}
        router={privateRoutes}
        fallbackElement={<Loading />}
      />
    );
  }
  return (
    <RouterProvider
      key={1}
      router={publicRoutes}
      fallbackElement={<Loading />}
    />
  );
}

export default App;
