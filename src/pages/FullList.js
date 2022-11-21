import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HabitDetails from "../components/HabitDetails";
import { useHabitsContext } from "../hooks/useHabitsContext";

const FullList = () => {
  const { habits, dispatch } = useHabitsContext();
  // const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleClick = () => {
    navigate("/create");
  };

  useEffect(() => {}, []);
  return (
    <div>
      {" "}
      <h2 className="text-center text-xl font-semibold">All HABITits</h2>
      <div className="flex flex-col gap-8 my-16">
        {habits.map((habit) => (
          <React.Fragment key={habit._id}>
            <HabitDetails habit={habit} noCompleteState />
          </React.Fragment>
        ))}
        {loading && (
          <div className="text-center tracking-widest text-lg font-semibold text-[#72BB9C]">
            Loading...
          </div>
        )}
        {!loading && habits.length < 1 && (
          <div className="flex flex-col justify-center items-center gap-12">
            <div className="text-center">You you have no HABITits</div>

            <button
              onClick={handleClick}
              className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-1 rounded-full duration-500 cursor-pointer"
            >
              Create One
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullList;
