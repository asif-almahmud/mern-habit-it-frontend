import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarLink from "../NavbarLink";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  console.log({ location });

  function handleScroll() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    window.onscroll = function () {
      handleScroll();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isScrolled ? "border-b border-gray-200 shadow-sm" : ""
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
        <div className="flex items-center gap-4">
          {location.pathname === "/" ? (
            ""
          ) : (
            <NavbarLink to="/">Home</NavbarLink>
          )}
          {location.pathname === "/full-list" ? (
            ""
          ) : (
            <NavbarLink to="/full-list">Full List</NavbarLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
