import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ to, children }) => {
  let classes =
    "mt-[4px] text-gray-600 hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-gray-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px] duration-500";
  let activeClasses = "text-gray-700 font-medium";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${activeClasses} ${classes}` : classes
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
