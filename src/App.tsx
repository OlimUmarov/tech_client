import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { getItem } from "./lib/itemStorage";
import privateAxios from "./lib/privateAxios";
import { useAppSelector, useAppDispatch } from "./app/hook";
import { changeAlert } from "./features/contentSlice";

function App() {
  const { isLogin } = useAppSelector((state) => state.contentSlice);
  const [isLogged, setLogged] = useState<boolean>(false);
  // const [isRealToken,setIsRealToken] = useState<boolean>(false)
  const token = getItem("access_token");
  const dispatch = useAppDispatch();

  const fetchCheckToken = async () => {
    try {
      const response = await privateAxios.get("/posts/my/");
      if (response.status === 200) {
        setLogged(true);
      }
    } catch (error: any) {
      dispatch(changeAlert({ message: error.response.data, color: "red" }));
    }
  };

  useEffect(() => {
    if (token) {
      fetchCheckToken();
    } else {
      setLogged(false);
    }
  }, [isLogin]);

  if (isLogged)
    return (
      <RouterProvider
        key={2}
        router={privateRoutes}
        fallbackElement={<h1>loading</h1>}
      />
    );
  return (
    <RouterProvider
      key={1}
      router={publicRoutes}
      fallbackElement={<h1>loading</h1>}
    />
  );
}

export default App;
