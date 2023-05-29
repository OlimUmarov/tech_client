import { useEffect, useState } from 'react'
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { useAppSelector } from "./app/hook";
import { getItem } from './lib/itemStorage';


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

  if (!isLogged) return <RouterProvider key={1} router={publicRoutes} fallbackElement={<h1>loading</h1>}/>
  return <RouterProvider key={2} router={privateRoutes} fallbackElement={<h1>loading</h1>}/>
  
  // return <RouterProvider key={2} router={privateRoutes} fallbackElement={<h1>loading</h1>}/>
}



export default App
