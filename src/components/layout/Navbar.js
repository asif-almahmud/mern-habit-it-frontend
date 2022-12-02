import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import NavbarLink from "../NavbarLink";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, dispatch } = useUserContext();

  console.log({ navbar: user });

  console.log({ location });

  function handleScroll() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    console.log({ user });
    localStorage.removeItem("habitit-user");
    console.log(user);
  }

  useEffect(() => {
    window.onscroll = function () {
      handleScroll();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isScrolled ? "border-b shadow-sm bg-white/70" : ""
      }`}
    >
      <div className="max-w-7xl px-4 py-5 mx-auto flex justify-between items-center ">
        <div className="grow flex items-center ">
          <Link to="/">
            <h1 className="font-semibold text-2xl tracking-wide border-b-4 -rotate-6 text-gray-600">
              HABIT<span className=" pl-px ">it</span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-4 ">
          <div className="flex gap-4 mt-[2px]">
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/full-list">All HABITits</NavbarLink>
          </div>
          <div className="flex items-center divide-x divide-solid divide-gray-400/50 border rounded-md bg-[#e9eae9] ">
            {!user ? (
              <>
                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-l-md">
                  <NavbarLink to="/login" borderBottom={false}>
                    Login
                  </NavbarLink>
                </div>
                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-r-md">
                  <NavbarLink to="/signup" borderBottom={false}>
                    Signup
                  </NavbarLink>
                </div>
              </>
            ) : (
              <button
                className="px-2 py-1 hover:bg-[#d7d9d8] rounded-md duration-300 "
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
