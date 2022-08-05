import { createContext, useReducer } from "react";

export const HabitsContext = createContext();

export const habitsReducer = (state, action) => {
   switch (action.type) {
      case "SET_HABITS":
         return {
            ...state,
            habits: action.payload,
         };
      case "ADD_HABIT":
         return {
            ...state,
            habits: [action.payload, ...state.habits],
         };
      case "UPDATE_HABIT":
         return {
            ...state,
            habits: state.habits.map((habit) => {
               if (habit._id === action.payload._id) {
                  return action.payload;
               }
               return habit;
            }),
         };
      case "DELETE_HABIT":
         return {
            ...state,
            habits: state.habits.filter((item) => item._id !== action.payload),
         };
      case "TO_BE_EDITED":
         return {
            ...state,
            toBeEdited: action.payload,
         };
      default:
         return state;
   }
};

export const HabitsContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(habitsReducer, {
      habits: [],
      toBeEdited: { title: "", reps: [] },
   });
   return (
      <HabitsContext.Provider value={{ ...state, dispatch }}>
         {children}
      </HabitsContext.Provider>
   );
};
