import { useAppSelector } from "../../app/hook";
// import { changeLogin } from "../../features/contentSlice";
// import { removeItem } from "../../lib/itemStorage"; useAppDispatch
import '../../App.css'

type Props = {
  title: string;
  active: boolean;
};

const Button = ({ title, active }: Props) => {
  // const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.contentSlice);

  // const handleLogOut = () => {
  //   removeItem('access_token')
  //   dispatch(changeLogin(!isLogin))
  // }

  return (
    <div>
      <button
        className={`py-2 px-5 border-2 rounded-xl mr-2  mb-2  ${
          active ? "blue" : "white"
        } ${isLogin && "cursor-not-allowed"}`}
        disabled={isLogin}
      >
        {title}
      </button>
    </div>
  );
};
export default Button;
