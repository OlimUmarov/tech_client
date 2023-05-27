
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function Home() {


  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
}

export default Home;
