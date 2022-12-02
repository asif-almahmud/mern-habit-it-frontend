import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

let localValue = localStorage.getItem("habitit-user");

const initialState = localValue ? JSON.parse(localValue) : null;

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return null;
    default:
      return prevState;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  console.log("User State from UserContextProvider: ", user);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
