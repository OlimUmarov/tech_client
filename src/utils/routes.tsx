import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/Login'
import MyPosts from '../pages/userPosts/MyPosts'
import NewPosts from '../pages/posts/NewPosts'
import PopularPosts from '../pages/posts/PopularPosts'
import SignUp from '../pages/auth/SignUp'
import ErrorPage  from '../pages/error/ErrorPage'
import PrivateLayout from '../components/layouts/PrivateLayout'
import PublicLayout from '../components/layouts/PublicLayout'
import Categories from '../pages/posts/Categories'
import { Post } from '../pages/posts/Post'
import { CreatePost } from '../pages/userPosts/CreatePost'
import { EditPost } from '../pages/userPosts/EditPost'
import AllPosts from '../pages/posts/AllPosts'
import { Search } from '../pages/search/Search'

export const publicRoutes = createBrowserRouter([
    {
      path: '/',
      errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
      element: <PublicLayout><AllPosts /></PublicLayout>,
      index: true,
    },
   
    {
      path: '/all-posts',
      errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
      element: <PublicLayout> <AllPosts /> </PublicLayout>,
    
    },
        {
          path: '/new-posts',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><NewPosts /></PublicLayout>
        },
        {
          path: '/popular-posts',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><PopularPosts /></PublicLayout>
        },
        {
          path: '/categories',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><Categories /></PublicLayout>,
          children: [
            {
              path: "/categories/:id",
              element: <PublicLayout><Categories /></PublicLayout>,
            }
          ]
        },
        {
          path: '/sign-up',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><SignUp /></PublicLayout>
        },
        {
          path: '/login',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout><Login /></PublicLayout>
        },
        {
          path: `/post/:id`,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PublicLayout> <Post/> </PublicLayout>,
        }, 
    
        {
          path: '*',
          element: <PublicLayout> <ErrorPage /> </PublicLayout>
        }
      

  ])
  
  export const privateRoutes = createBrowserRouter([
    {
      path: '/',
      errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
      element: <PrivateLayout> <AllPosts /> </PrivateLayout>,
      index: true,
    },
    {
      path: '/all-posts',
      errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
      element: <PrivateLayout> <AllPosts /> </PrivateLayout>,
    }, 
        {
          path: '/new-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <NewPosts /> </PrivateLayout>,
        },
        {
          path: '/popular-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <PopularPosts /> </PrivateLayout>,
        },
        {
          path: '/categories',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <Categories/> </PrivateLayout>,
          children: [
            {
              path: '/categories/:id',
            },
          ]
        },
        {
          path: '/my-posts',
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
          element: <PrivateLayout> <MyPosts/> </PrivateLayout>,
          children: [
            {
              path: '/my-posts/:id',
              errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
            },
          ]
        },
        {
          path: '/my-posts/create-post',
          element: <PrivateLayout> <CreatePost/> </PrivateLayout>,
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
        },
        {
          path: '/my-posts/edit-post/:id',
          element: <PrivateLayout> <EditPost/> </PrivateLayout>,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
        },
        {
          path: `/post`,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PrivateLayout><Navigate to="/all-posts" replace/> </PrivateLayout>,
        }, 
        {
          path: `post/:id`,
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PrivateLayout> <Post/> </PrivateLayout>,
        }, 
        {
          path: '/search',
          element: <PrivateLayout> <Search/> </PrivateLayout>,
          errorElement: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
        },  
        {
          path: '*',
          errorElement: <PublicLayout> <ErrorPage /> </PublicLayout>,
          element: <PrivateLayout> <ErrorPage /> </PrivateLayout>,
    
        },


  ])