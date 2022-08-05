import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <header>
         <div className="py-5 mx-auto flex justify-between items-center ">
            <div className="grow flex items-center ">
               <Link to="/">
                  <h1 className="font-semibold text-2xl tracking-wide border-b-4 -rotate-6 text-gray-600">
                     HABIT<span className=" pl-px ">it</span>
                  </h1>
               </Link>
            </div>
         </div>
      </header>
   );
};

export default Navbar;
