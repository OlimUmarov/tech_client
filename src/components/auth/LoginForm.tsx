import { useAppDispatch, useAppSelector } from "../../app/hook"
import { changeLogin } from "../../features/contentSlice"
import { setItem } from "../../lib/itemStorage"

function LoginForm() {
const { isLogin } = useAppSelector((state) => state.contentSlice)
const dispatch = useAppDispatch()


const handleLoginSubmit = () => {
  dispatch(changeLogin(!isLogin))
  setItem('access_token', 'efdfefef')
}



  return (
    <div>
        <button onClick={handleLoginSubmit}> LOGIN </button>
    </div>
  )
}

export default LoginForm