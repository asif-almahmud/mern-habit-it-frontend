import { createContext, useEffect, useReducer } from "react";

export const LoadingContext = createContext();

const initialState = { loading: false, error: null };

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...prevState, loading: true };
    case "LOADED":
      return { ...prevState, loading: false };
    case "ERROR":
      return { ...prevState, error: action.payload };
    case "REMOVE_ERROR":
      return { ...prevState, error: null };
    default:
      return prevState;
  }
};

export const LoadingContextProvider = ({ children }) => {
  const [{ loading, error }, dispatch] = useReducer(userReducer, initialState);

  console.log(
    `Loading State -> ${loading}, Error State -> ${error} from LoadingContextProvider.`
  );

  return (
    <LoadingContext.Provider value={{ loading, error, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
