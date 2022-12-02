import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw Error(
      "useLoadingContext must be used inside a HabitsContextProvider"
    );
  }

  return context;
};
