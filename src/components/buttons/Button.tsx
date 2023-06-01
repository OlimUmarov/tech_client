import { useAppSelector } from "../../app/hook";
// import { changeLogin } from "../../features/contentSlice";
// import { removeItem } from "../../lib/itemStorage"; useAppDispatch
import "../../App.css";

type Props = {
  title: string;
  active?: boolean;
  width?: boolean;
  onClick?: () => void,
};

const Button = ({ title, active, width,onClick }: Props) => {
  const { isLogin } = useAppSelector((state) => state.contentSlice);

  return (
    <div>
      <button
        className={`py-1 px-3 border-2  max-md:font-xs font-base rounded-md mr-2  mb-2  ${
          active ? "blue" : "white"
        } ${width && "w-full"} 
           ${isLogin && "cursor-not-allowed"}`}
           onClick={onClick}
        disabled={isLogin}
      >
        {title}
      </button>
    </div>
  );
};
export default Button;
