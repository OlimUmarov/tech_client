import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AlertDialog } from "../alerts/AlertDialog";

export const CardToggleMenu = ({ post_id }: { post_id: number }) => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  function handleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function handleDialog() {
    setShowDialog(!showDialog);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsMenuActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="" ref={elementRef}>
      <span
        onClick={handleMenu}
        className="w-10 h-10 flex justify-end cursor-pointer z-10"
      >
        <BsThreeDotsVertical size={20} />
      </span>
      {isMenuActive && (
        <div className="absolute top-6 right-1 flex flex-col bg-white border border-slate-50">
          <Link
            to={`/my-posts/edit-post/${post_id}`}
            onClick={handleMenu}
            className="flex gap-1 text-sm text-gray-500 p-2 border-0  rounded-md hover:text-white  hover:bg-green-400 cursor-pointer transition-all duration-150 ease"
          >
            <span className="flex items-center text-sm ">
              <BiEditAlt size={15} />
            </span>
            o'zgartirish
          </Link>
          <span
            onClick={() => {
              handleMenu();
              handleDialog()
            }}
            className="flex gap-1 text-sm text-gray-500 p-2 border-0  rounded-md hover:text-white  hover:bg-red-400  cursor-pointer transition-all duration-150 ease"
          >
            <span className="flex items-center text-sm ">
              <MdDelete size={15} />
            </span>
            o'chirish
          </span>
        </div>
      )}
      <AlertDialog toggled={showDialog} post_id={post_id} handleDialog={handleDialog} />
    </div>
  );
};
