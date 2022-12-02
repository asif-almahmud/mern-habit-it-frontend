import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext must be used inside a UserContextProvider");
  }

  return context;
};

export default useUserContext;
