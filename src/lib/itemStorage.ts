import Cookies from 'js-cookie';

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

// Cookies
export const setCookies =  (key: "postId",data:string) => {
    try{
        Cookies.set(key, data);
        
    }catch (error) {
        console.log(error)
    }
} 

export const getCokkies = (key: "postId") => {
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
