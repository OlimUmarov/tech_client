import {
  useLocation,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import navbarLinks from "./navbarLinks";
import { ReactNode, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import { UserAccount } from "../buttons/UserAccount";
import Logo from "../../assets/logo1.svg"

const PrivateNavbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOption,setMenuOption] = useState<string>()
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedQuery = event.target.value;
    setSearchQuery(typedQuery);

    if (typedQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(typedQuery)}`);
    } else {
      navigate(`/all-posts`);
    }
  };

  const handleMenuToggle = (link?: string) => {
    setIsMenuOpen(!isMenuOpen);
    setMenuOption(link)

  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchQuery(query);
    setMenuOption(location.pathname)
  }, [searchParams]);

  const navbars: ReactNode = navbarLinks.map((navbar) => {
    return (
      <NavLink to={navbar.link} key={navbar.link} onClick={()=> handleMenuToggle(navbar.link)}>
        <span
          className={` pr-4  text-base max-lg:text-xl hover:text-blue-500 lg:hover:bg-transparent ${
            menuOption === navbar.link ? "text-blue-500" : "text-gray-500"
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
      <header className={`bg-white border-b border-gray-200`}>
        <nav className="py-3  dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto contain">
            <div className="flex flex-wrap justify-center items-center gap-5">
              <NavLink to="/" className="flex items-center">
                <img
                  src={Logo}
                  className="sm:h-6 h-6 rounded-full object-cover mr-1"
                  alt="MazMoon Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                MazMoon
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

            <section className="flex justify-center items-center gap-5">
              <div className="flex flex-wrap gap-2 max-sm:hidden">
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
                    className="block max-sm:w-40  transition-all duration-300 ease  p-2  pl-10 text-sm text-gray-900 border border-white   focus:bg-white outline-none  rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 trans"
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
              </div>

              {/* Burger Menu */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={()=> handleMenuToggle()}
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
                  <div className="absolute top-0 right-0 w-screen h-screen  dark:bg-gray-800 z-50">
                    <div className="bg-black opacity-50 absolute top-0 left-0 max-md:w-1/3 w-1/2 h-screen max-sm:1/3"></div>
                    <div className="w-1/2 max-sm:w-full max-md:w-2/3 h-screen bg-white absolute top-0 right-0">

                      <section className="flex flex-wrap sm:hidden gap-2 pt-20 px-6">
                        <div className="relative">
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
                            className="block transition-all duration-300 ease  p-2  pl-10 text-sm text-gray-900 border border-white dark:text-black   focus:bg-white outline-none  rounded-lg bg-gray-100 trans"
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
                      </section>

                      <ul className="flex flex-col items-start pl-6 justify-center py-10">
                        {navbars}
                      </ul>
                      <span
                        onClick={()=> handleMenuToggle()}
                        className="absolute top-6 right-4 max-sm:right-10"
                      >
                        <GrFormClose size={25} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default PrivateNavbar;
