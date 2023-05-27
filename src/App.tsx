import { useEffect, useState } from 'react'
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { useAppSelector } from "./app/hook";
import { getItem } from './lib/itemStorage';
import { Loader } from '@mantine/core';


function App() {
  const { isLogin } = useAppSelector((state) => state.contentSlice)
  const [isLogged, setLogged] = useState<boolean>(false)
  const token = getItem("access_token")
  
useEffect(() => {  
  if (!token) {
    setLogged(false)
  } else {
    setLogged(true)
  }
}, [isLogin])

  if (!isLogged) return <RouterProvider key={1} router={publicRoutes} fallbackElement={<Loader />}/>
  return <RouterProvider key={2} router={privateRoutes} fallbackElement={<Loader />}/>
}



export default App
