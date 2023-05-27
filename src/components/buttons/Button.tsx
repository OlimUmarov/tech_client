import { useAppSelector } from "../../app/hook";
// import { changeLogin } from "../../features/contentSlice";
// import { removeItem } from "../../lib/itemStorage"; useAppDispatch
import '../../App.css'

type Props = {
  title: string;
  active?: boolean;
  width?: boolean
};

const Button = ({ title, active, width }: Props) => {
  // const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.contentSlice);

  // const handleLogOut = () => {
  //   removeItem('access_token')
  //   dispatch(changeLogin(!isLogin))
  // }

  return (
    <div>
      <button
        className={`py-2.5 px-5 border-2 font-medium rounded-xl mr-2  mb-2  ${
          active ? "blue" : "white" } ${width && "w-full"} 
           ${isLogin && "cursor-not-allowed"}`}
        disabled={isLogin}
      >
        {title}
      </button>
    </div>
  );
};
export default Button;
