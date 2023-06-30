import { RiArrowDropDownLine, RiNewspaperLine } from "react-icons/ri";
import { useState,useRef,useEffect } from "react";
import {  useAppDispatch, useAppSelector } from "../../app/hook";
import { NavLink } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { deleteCatId, deleteLike, removeItem, setLogin } from "../../lib/itemStorage";
import { changeLogin } from "../../features/contentSlice";
import Profile from "../../assets/profile.svg"

export const UserAccount = () => {
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const {isLogin} = useAppSelector((state) => state.contentSlice)
  const elementRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()

  function handleMenu() {
    setIsMenuClicked(!isMenuClicked);
  }
  const handleLogout = () => {
    handleMenu();
    removeItem("access_token");
    deleteCatId("catId")
    deleteLike("like")
    dispatch(changeLogin(!isLogin))
    setLogin("isLogin","false")
    };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        setIsMenuClicked(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="w-full lg:max-w-sm" ref={elementRef}>
        <button
          onClick={handleMenu}
          className="flex items-center py-1 px-2 border border-white outline-none custom-select  max-md:font-xs font-base  rounded-md "
        >
          <img src={Profile} alt="profile" className="w-8 h-8 border border-slate-300 rounded-full" />
          <RiArrowDropDownLine size={25} />
        </button>
        {isMenuClicked && (
          <div className="absolute right-0 max-lg:w-40  z-10 mt-1 w-40 p-2 border bg-white border-slate-100 flex flex-col">
            <NavLink
              to="/my-posts"
              onClick={handleMenu}
              className="flex justify-center items-center text-sm gap-1 text-gray-500 p-1 cursor-pointer hover:text-blue-500"
            >
              <span>
                <RiNewspaperLine size={15} />
              </span>
              Mening Postlarim
            </NavLink>
            <NavLink
              to="/my-posts/create-post"
              onClick={handleMenu}
              className="flex justify-start  text-sm items-center gap-1 text-gray-500 p-1 cursor-pointer hover:text-blue-500"
            >
              <span>
                <BsPlus size={15} />
              </span>
              Post Yaratish
            </NavLink>
            <span
              onClick={handleLogout}
              className="flex justify-start  text-sm items-center gap-1 text-gray-500 p-1 cursor-pointer hover:text-blue-500"
            >
              <span>
                <BiExit size={15} />
              </span>
              Chiqish
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
