import React from "react";
import { Link } from "react-router-dom";

const NavbarLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <div className="mt-[4px] text-green-700 cursor-pointer flex flex-col justify-center items-center after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-green-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px] duration-500">
        {children}
      </div>
    </Link>
  );
};

export default NavbarLink;
