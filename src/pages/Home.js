import React, { useEffect, useState } from "react";
import axios from "axios";
import HabitDetails from "../components/HabitDetails";
import AddNewHabitForm from "../components/AddNewHabitForm";
import DayAndTime from "../components/DayAndTime";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { Link } from "react-router-dom";
import { useDay, useDate } from "../utils/date";

const Home = () => {
   const { day } = useDay();
   const { habits, dispatch } = useHabitsContext();
   // const [habits, setHabits] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isNewDay, setIsNewDay] = useState(false);

   console.log({ habits });

   //Todo
   const fetchPreviousDays = () => {
      let previousDay; // we will have to fetch previous day by a get request
      if (day !== previousDay) {
         setIsNewDay(true);
      }
   };

   //Todo
   const updateHabitsOnNewDay = () => {};

   const fetchHabits = async () => {
      setLoading(true);
      try {
         const res = await axios("/api/habits");
         const data = res.data;
         console.log({ data });

         if (data) {
            dispatch({
               type: "SET_HABITS",
               // payload: data,
               payload: data.filter((habit) => habit.reps.includes(day)),
            });
         }
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };

   useEffect(() => {
      //Todo
      fetchPreviousDays();

      //Todo
      if (isNewDay) {
         updateHabitsOnNewDay();
      }

      fetchHabits();
   }, [dispatch]);

   return (
      <>
         <div className="flex">
            <div className="basis-4/5 md:pr-8 pb-12 md:border-r">
               <DayAndTime />
               <div className="flex flex-col gap-8 my-16">
                  {habits.map((habit) => (
                     <React.Fragment key={habit._id}>
                        <HabitDetails habit={habit} />
                     </React.Fragment>
                  ))}
                  {loading && (
                     <div className="text-center tracking-widest text-lg font-semibold text-[#72BB9C]">
                        Loading...
                     </div>
                  )}
                  {!loading && habits.length < 1 && (
                     <div className="text-center">
                        Your HABITit list for today is empty
                     </div>
                  )}
               </div>
            </div>
            <div className="basis-1/5 sticky top-0 h-[80vh] pl-8 hidden md:flex flex-col justify-center items-center">
               <AddNewHabitForm />
            </div>

            <Link to="create">
               <i className="md:hidden fa fa-plus fixed bottom-16 right-10 w-14 h-14 flex justify-center items-center outline outline-2 bg-[#92dBbC]/80 rounded-full text-2xl text-white"></i>
            </Link>
         </div>
      </>
   );
};

export default Home;
