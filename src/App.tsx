// import { useEffect } from "react";
// import { RouterProvider } from "react-router-dom";
// import { privateRoutes, publicRoutes } from "./utils/routes";
// import { getItem, setLogin } from "./lib/itemStorage";
// import privateAxios from "./lib/privateAxios";
// import { useAppDispatch, useAppSelector } from "./app/hook";
// import { changeAlert } from "./features/contentSlice";
// import { Loading } from "./components/loading/Loading";

// function App() {
//   const dispatch = useAppDispatch();
//   const { isLogin } = useAppSelector((state) => state.contentSlice);
//   const token = getItem("access_token");

//   const fetchCheckToken = async () => {
//    await privateAxios.get("/posts/my").then((res) => {
//     if (res.status === 200) {
//       setLogin("isLogin", "true");
//       console.log("my posts ", isLogin)
//     }
//    }).catch((res)=>{
//     dispatch(changeAlert({ message: res.statusText, color: "red" }));
//     setLogin("isLogin", "false");
//   })
//    }
    

//   useEffect(() => {
//     if (token) {
//       fetchCheckToken();
//     }
//   }, [token,isLogin]); 

//   if (isLogin) {
//     return (
//       <RouterProvider
//         key={2}
//         router={privateRoutes}
//         fallbackElement={<Loading />}
//       />
//     );
//   }
//   return (
//     <RouterProvider
//       key={1}
//       router={publicRoutes}
//       fallbackElement={<Loading />}
//     />
//   );
// }

// export default App;


import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { getItem, setLogin } from "./lib/itemStorage";
import privateAxios from "./lib/privateAxios";
import { useAppDispatch } from "./app/hook";
import { changeAlert } from "./features/contentSlice";
import { Loading } from "./components/loading/Loading";

function App() {
  const dispatch = useAppDispatch();
  const token = getItem("access_token");

  const fetchCheckToken = async () => {
   await privateAxios.get("/posts/my").then((res) => {
    if (res.status === 200) {
      setLogin("isLogin","true")
    }
   }).catch((res)=>{
    dispatch(changeAlert({ message: res.statusText, color: "red" }));
  })
   }
    

  useEffect(() => {
    if (token) {
      fetchCheckToken();
    }
    
  }, [token]); 

  if (token) {
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


