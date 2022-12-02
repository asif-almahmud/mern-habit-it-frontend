import React, { useEffect, useState } from "react";
import HabitDetails from "../components/HabitDetails";
import AddNewHabitForm from "../components/AddNewHabitForm";
import DayAndTime from "../components/DayAndTime";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { Link } from "react-router-dom";
import { useDay } from "../utils/date";
import useGet from "../hooks/fetch/useGet";
import Quotes from "../components/Quotes";

const Home = () => {
  const { day } = useDay();
  const { todayHabits, allHabits, date, dispatch } = useHabitsContext();
  const [loading, setLoading] = useState(true);
  const { getRequest } = useGet();

  console.log({ todayHabits });

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await getRequest(`/habits?day=${date}`, {
        withAuthHeader: true,
      });
      const data = res.data;
      console.log({ data });

      if (data) {
        dispatch({
          type: "SET_TODAY_HABITS",
          payload: data.filter((habit) => habit.reps.includes(day)),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHabits();
  }, [day, allHabits]);

  return (
    <div className="flex relative ">
      <div className="basis-full md:basis-4/5 md:pr-8 pb-12 md:border-r">
        <DayAndTime />
        <Quotes />
        <div className="flex flex-col gap-8 my-16">
          {todayHabits.map((habit) => (
            <React.Fragment key={habit._id}>
              <HabitDetails habit={habit} />
            </React.Fragment>
          ))}
          {todayHabits.length < 1 && loading && (
            <div className="loader m-auto mt-12"></div>
          )}
          {!loading && todayHabits.length < 1 && (
            <div className="text-center">
              Your HABITit list for today is empty
            </div>
          )}
        </div>
      </div>
      <div className="md:basis-1/5 sticky top-0 h-[80vh] pl-8 hidden md:flex flex-col justify-center items-center">
        <AddNewHabitForm />
      </div>

      <Link to="/create">
        <i className="md:hidden fa fa-plus fixed bottom-16 right-10 w-14 h-14 flex justify-center items-center outline outline-2 bg-[#92dBbC]/80 rounded-full text-2xl text-white"></i>
      </Link>
    </div>
  );
};

export default Home;
