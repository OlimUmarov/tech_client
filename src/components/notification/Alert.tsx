import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc";
import { MdDone } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../app/hook";

export const Alert = () => {
  const [show, setShow] = useState<boolean>(false);
  const { showAlert } = useAppSelector((state) => state.contentSlice);

  useEffect(() => {
    if (showAlert.message) {
        setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="alert-message">
      <CSSTransition
        in={show}
        timeout={300}
        classNames="alert-transition"
        unmountOnExit
      >
        <main
          className="fixed  right-4 p-4 mb-4 w-96 text-gray-800 border border-slate-50 drop-shadow-md rounded-lg bg-white dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          {showAlert.color === "red" && (
            <div className="flex justify-start gap-2 items-center">
              <VscError size={22} color={"red"} />
              <span className="font-semibold">
                {showAlert.message ? showAlert.message : "Hatolik yuz berdi!"}
              </span>
            </div>
          )}
          {showAlert.color === "green" && (
            <div className="flex justify-start gap-2 items-center">
              <span className="bg-green-400 border-0 rounded-full p-1">
                <MdDone size={15} color={"white"} />
              </span>
              <span className="font-semibold">
                Siz muvaffaqiyatli tizimga kirdingiz!
              </span>
            </div>
          )}
        </main>
      </CSSTransition>
    </div>
  );
};
