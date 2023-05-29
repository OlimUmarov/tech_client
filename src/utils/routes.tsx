import { createBrowserRouter,RouteObject } from 'react-router-dom'
import Login from '../pages/auth/Login'
import MyPosts from '../pages/userPosts/MyPosts'
import NewPosts from '../pages/posts/NewPosts'
import PopularPosts from '../pages/posts/PopularPosts'
import SignUp from '../pages/auth/SignUp'
import ErrorPage  from '../pages/error/ErrorPage'
import PrivateLayout from '../components/layouts/PrivateLayout'
import PublicLayout from '../components/layouts/PublicLayout'
import Categories from '../pages/posts/Categories'
import NotFound from '../pages/error/NotFound'

export const publicRoutes = createBrowserRouter([
    {
      path: '/',
      errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
      element: <PublicLayout><NewPosts /></PublicLayout>,
      index: true,
    },
        {
          path: '/new-posts',
          index: true,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><NewPosts /></PublicLayout>
        },
        {
          path: '/popular-posts',
          index: true,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><PopularPosts /></PublicLayout>
        },
        {
          path: '/categories',
          index: true,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><Categories /></PublicLayout>
        },
        {
          path: '/sign-up',
          index: true,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><SignUp /></PublicLayout>
        },
        {
          path: '/login',
          index: true,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><Login /></PublicLayout>
        },
    
        {
          path: '*',
          element: <PublicLayout> <NotFound /> </PublicLayout>
        }
      

  ])
  
  export const privateRoutes = createBrowserRouter([
    {
      path: '/',
      errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
      element: <PrivateLayout> <NewPosts /> </PrivateLayout>,
      index: true,
    },
        {
          path: '/new-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <NewPosts /> </PrivateLayout>,
          index: true,
        },
        {
          path: '/popular-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <PopularPosts /> </PrivateLayout>,
          index: true,
        },
        {
          path: '/categories',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <Categories/> </PrivateLayout>,
          index: true,
        },
        {
          path: '/my-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <MyPosts/> </PrivateLayout>,
          index: true,
        },   
        {
          path: '*',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <NotFound /> </PrivateLayout>,
          index: true,
        }
    


  ])