import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { getItem } from "./lib/itemStorage";
import privateAxios from "./lib/privateAxios";
import { useAppSelector, useAppDispatch } from "./app/hook";
import { changeAlert, changeLogin } from "./features/contentSlice";
import { Loading } from "./components/loading/Loading";

function App() {
  const { isLogin } = useAppSelector((state) => state.contentSlice);
  const dispatch = useAppDispatch();
  const token = getItem("access_token");

  const fetchCheckToken = async () => {
    try {
      const response = await privateAxios.get("/posts/my");
      if (response.status === 200) {
        dispatch(changeLogin(true))
            }
    } catch (error: any) {
      dispatch(changeAlert({ message: error.response.data, color: "red" }));
    }
  };

  useEffect(() => { 
    if (token) {
      fetchCheckToken();
    } else {
      dispatch(changeLogin(false))
    }
  }, [token,isLogin]);

  if (isLogin)
    return (
      <RouterProvider
        key={2}
        router={privateRoutes}
        fallbackElement={<Loading/>}
      />
    );
  return (
    <RouterProvider
      key={1}
      router={publicRoutes}
      fallbackElement={<Loading/>}
    />
  );
}

export default App;
