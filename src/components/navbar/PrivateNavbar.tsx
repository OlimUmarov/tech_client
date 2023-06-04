import {
  useLocation,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import navbarLinks from "./navbarLinks";
import { ReactNode, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GrFormClose } from 'react-icons/gr'
import { UserAccount } from "../buttons/UserAccount";

const PrivateNavbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const navbars: ReactNode = navbarLinks.map((navbar) => {
    const currentPath = location.pathname === navbar.link;

    return (
      <NavLink to={navbar.link} key={navbar.link}
      onClick={handleMenuToggle}
      >
        <span
          className={` pr-4  pl-3 py-2 text-gray-500 text-base border-b border-gray-100 hover:text-blue-500 lg:hover:bg-transparent ${
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
          <div className="flex flex-wrap justify-between items-center mx-auto contain">
            <div className="flex flex-wrap justify-center items-center gap-10">
              <NavLink to="/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Tech Awards
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
                className="block w-64 max-sm:w-40  transition-all duration-300 ease  p-2  pl-10 text-sm text-gray-900 border border-white   focus:bg-white outline-none  rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 trans"
                placeholder="Izlash..."
                required
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="relative flex items-center lg:order-2">
              <div>
                <UserAccount />
              </div>
            </div>
              {/* Burger Menu */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={handleMenuToggle}
                  className="block text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
                  aria-label="Open mobile menu"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className={isMenuOpen ? "hidden" : "block"}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                    />
                    <path
                      className={isMenuOpen ? "block" : "hidden"}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                    />
                  </svg>
                </button>
                {isMenuOpen && (
      
                  <div className="absolute top-0 right-0 w-1/2  h-screen bg-white dark:bg-gray-800 z-50">
                    <ul className="flex flex-col items-start pl-4 justify-center py-16">
                      {navbars}
                    </ul>
                    <span 
                    onClick={handleMenuToggle}
                    className="absolute top-6 right-4">
                    <GrFormClose size={25}/>
                    </span>
                  </div>
                
                )}
              </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default PrivateNavbar;
