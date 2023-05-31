import { useLocation, NavLink } from "react-router-dom";
import navbarLinks from "./navbarLinks";
import { ReactNode, useEffect, useState } from "react";
import Button from "../buttons/Button";
import buttonNames from "../buttons/buttonNames";
import { getItem } from "../../lib/itemStorage";
import { IoIosSearch } from "react-icons/io";
import { UserAccount } from "../buttons/UserAccount";


const Navbar = () => {
  const [token, setToken] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = getItem("access_token");
    token && setToken(token);
  }, []);

  const navbars: ReactNode = navbarLinks.map((navbar) => {
    const currentPath = location.pathname === navbar.link;

    return (
      <NavLink to={navbar.link} key={navbar.link}>
        <span
          className={`py-2 pr-4 pl-3 text-gray-500 text-base border-b border-gray-100 hover:text-blue-500 lg:hover:bg-transparent ${
            currentPath ? "text-blue-500" : ""
          }
        lg:border-0 lg:hover:text-primary-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
        >
          {navbar.name}
        </span>
      </NavLink>
    );
  });

  return (
    <div>
      <header className="bg-white border-b border-gray-200 ">
        <nav className="py-3  dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex flex-wrap justify-center items-center gap-10">
              <NavLink to="/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Tech
                </span>
              </NavLink>

              <div
                className="hidden justify-between items-center pt-1 w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col  lg:flex-row lg:space-x-8 lg:mt-0">
                  {navbars}
                </ul>
              </div>
            </div>

            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition duration-150 ease-in-out">
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 trans ${
                    isFocused ? "scale-110	 rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <IoIosSearch size={20} />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2  pl-10 text-sm text-gray-900 border border-white   focus:bg-white outline-none  rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 trans"
                placeholder="Izlash..."
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="flex items-center lg:order-2">
              {token ? (
                <div>
                  <UserAccount/>
                </div>
              ) : (
                <>
                  <NavLink to={buttonNames.links.signUp}>
                    <Button title={buttonNames.name.signUp} active={true} />
                  </NavLink>
                  <NavLink to={buttonNames.links.login}>
                    <Button title={buttonNames.name.login} active={false} />
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
