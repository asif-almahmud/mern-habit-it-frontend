import { createContext, useReducer } from "react";

export const HabitsContext = createContext();

export const habitsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODAY_HABITS":
      return {
        ...state,
        todayHabits: action.payload,
      };
    case "SET_ALL_HABITS":
      return {
        ...state,
        allHabits: action.payload,
      };
    case "SET_SORTED_HABITS":
      return {
        ...state,
        sortedHabits: action.payload,
      };
    case "SET_SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload,
      };
    case "ADD_HABIT":
      return {
        ...state,
        allHabits: [action.payload, ...state.allHabits],
      };
    case "UPDATE_HABIT":
      return {
        ...state,
        todayHabits: state.todayHabits.map((habit) => {
          if (habit._id === action.payload._id) {
            return action.payload;
          }
          return habit;
        }),
        allHabits: state.allHabits.map((habit) => {
          if (habit._id === action.payload._id) {
            return action.payload;
          }
          return habit;
        }),
      };
    case "DELETE_HABIT":
      return {
        ...state,
        todayHabits: state.todayHabits.filter(
          (item) => item._id !== action.payload
        ),
        allHabits: state.allHabits.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "TO_BE_EDITED":
      return {
        ...state,
        toBeEdited: action.payload,
      };
    case "SET_QUOTE_INDEX":
      return {
        ...state,
        quoteIndex: action.payload,
      };
    default:
      return state;
  }
};

const initialSortOption = localStorage.getItem("sort-option")
  ? localStorage.getItem("sort-option")
  : "newest-first";

const initialQuoteIndex = localStorage.getItem("quote-index")
  ? localStorage.getItem("quote-index")
  : 0;

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

export const HabitsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, {
    todayHabits: [],
    allHabits: [],
    sortedHabits: [],
    sortOption: initialSortOption,
    toBeEdited: { title: "", reps: [] },
    quoteIndex: initialQuoteIndex,
    date: formattedDate,
  });
  return (
    <HabitsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HabitsContext.Provider>
  );
};
