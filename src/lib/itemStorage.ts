import Cookies from 'js-cookie';
import { likesListType } from '../types/posts';

// LocaleStorage
export const setItem = (key: 'access_token', data: string) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log(error)
    }
}

export const getItem = (key: 'access_token') => {
    try {
       return localStorage.getItem(key) 
    } catch (error) {
        console.log(error)
    }
}


export const removeItem = (key: 'access_token') => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log(error)
    }
}

export const setLike = (post_id: string, liked: boolean) => {
    try {
      const existingLikesString = Cookies.get("like");
      const existingLikes = existingLikesString ? JSON.parse(existingLikesString) : [];
      
      const existingLikeIndex = existingLikes.findIndex((like:likesListType) => like.post_id === post_id);
  
      if (existingLikeIndex !== -1) {
        existingLikes[existingLikeIndex].liked = liked;
      } else {
        existingLikes.push({ post_id, liked });
      }
      
      Cookies.set("like", JSON.stringify(existingLikes));
    } catch (error) {
      console.log(error);
    }
  };

export const getLike = (key: "like") => {
    try{
        return Cookies.get(key);
    }catch (error) {
        console.log(error)
    }
} 

export const setCatId =  (key: "catId",data:string) => {
    try{
        Cookies.set(key, data);
        
    }catch (error) {
        console.log(error)
    }
} 

export const getCatId = (key: "catId") => {
    try{
        return Cookies.get(key);
    }catch (error) {
        console.log(error)
    }
} 

export const setLogin =  (key: "isLogin",data:"true" | "false") => {
    try{
        Cookies.set(key, data);
        
    }catch (error) {
        console.log(error)
    }
} 

export const getLogin = (key: "isLogin") => {
    try{
        return Cookies.get(key);
    }catch (error) {
        console.log(error)
    }
} 
