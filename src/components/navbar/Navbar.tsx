import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import navbarLinks from "./navbarLinks";
import { ReactNode } from "react";
import Button from "../buttons/Button";
import buttonNames from "../buttons/buttonNames";

// type Props = {
  // props: Props
// };

const Navbar = () => {
  const { isLogin } = useAppSelector((state) => state.contentSlice);

  const navbars: ReactNode = navbarLinks.map((navbar) => {
    return (
      <Link to={navbar.link} key={navbar.link}>
        <span  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
          {navbar.name}
        </span>
      </Link>
    );
  });

  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Tech
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {!isLogin ? (
                <>
                  <Link to={buttonNames.links.signUp}>
                    <Button title={buttonNames.name.signUp} active={true} />
                  </Link>
                  <Link to={buttonNames.links.login}>
                    <Button title={buttonNames.name.login} active={false} />
                  </Link>
                </>
              ) : (
                <Link to={buttonNames.links.myPosts}>
                  <Button title={buttonNames.name.myPosts} active={true} />
                </Link>
              )}


            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {navbars}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
