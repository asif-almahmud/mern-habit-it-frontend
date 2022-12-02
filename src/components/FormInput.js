import React from "react";

const FormInput = (props) => {
  return (
    <input
      {...props}
      className="bg-white/60 px-4 py-2 outline outline-1 outline-slate-300/70 text-sm rounded-full focus:rounded-full focus:outline-2 focus:outline-[#92dbbC]"
    />
  );
};

export default FormInput;
