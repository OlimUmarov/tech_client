import { RiArrowDropDownLine, RiNewspaperLine } from "react-icons/ri";
import { useState,useRef,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { BiExit } from "react-icons/bi";

export const UserAccount = () => {
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  function handleMenu() {
    setIsMenuClicked(!isMenuClicked);
  }

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
      <div className=" w-full lg:max-w-sm" ref={elementRef}>
        <button
          onClick={handleMenu}
          className=" relative flex items-center blue py-1 px-2 border border-white outline-none custom-select  max-md:font-xs font-base  rounded-md "
        >
          <span>Account</span>
          <RiArrowDropDownLine size={25} />
        </button>
        {isMenuClicked && (
          <div className="absolute right-4 z-10 mt-1 p-2 border bg-white border-slate-100 flex flex-col">
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
              onClick={handleMenu}
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