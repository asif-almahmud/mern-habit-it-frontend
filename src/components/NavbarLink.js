import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ to, children, borderBottom = true }) => {
  let afterClasses =
    "after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-gray-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px]";
  let classes = ` hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center  duration-500 ${
    borderBottom ? afterClasses : ""
  }`;
  let activeClasses = "text-gray-700 font-medium";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${classes} ${activeClasses}` : classes
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
