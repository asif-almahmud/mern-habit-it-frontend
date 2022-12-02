import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNewHabitForm from "../components/AddNewHabitForm";
import HabitDetails from "../components/HabitDetails";
import useGet from "../hooks/fetch/useGet";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { days } from "../utils/date";

const FullList = () => {
  const { allHabits, sortedHabits, sortOption, dispatch } = useHabitsContext();
  const { getRequest, loading, error } = useGet();

  const fetchAllHabits = async () => {
    try {
      const res = await getRequest("/habits", {
        withAuthHeader: true,
      });
      const data = res.data;
      console.log({ data });

      if (data) {
        dispatch({
          type: "SET_ALL_HABITS",
          // payload: data,
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortHabits = (sortOption) => {
    if (sortOption === "days") {
      let categorizedHabits = [];
      if (allHabits.length > 0) {
        days.forEach((day) =>
          categorizedHabits.push({
            day,
            habits: allHabits.filter((habit) => habit.reps.includes(day)),
          })
        );
        dispatch({ type: "SET_SORTED_HABITS", payload: categorizedHabits }); // remember "let" is block scoped
      }
    }

    if (sortOption === "newest-first") {
      dispatch({ type: "SET_SORTED_HABITS", payload: allHabits });
      console.log({ allHabits, sortedHabits });
    }

    if (sortOption === "oldest-first") {
      let tempArray = [...allHabits];
      dispatch({ type: "SET_SORTED_HABITS", payload: tempArray.reverse() });
    }

    console.log({ sortOption });
    console.log({ sortedHabits });
  };

  const handleOptionChange = (e) => {
    dispatch({ type: "SET_SORT_OPTION", payload: e.target.value });
    localStorage.setItem("sort-option", e.target.value);
    sortHabits(e.target.value);
  };

  useEffect(() => {
    fetchAllHabits();
  }, []);

  useEffect(() => {
    sortHabits(sortOption);
  }, [allHabits]);

  return (
    <div className="flex relative ">
      <div className="basis-full md:basis-4/5 md:pr-8 pb-12 md:border-r">
        <h2 className="text-center text-xl font-semibold">All HABITits</h2>
        <div className="flex items-center my-8">
          <label>
            Sort by
            <select
              value={sortOption}
              onChange={handleOptionChange}
              className="mx-1 pl-px pr-1 border focus:outline-0"
            >
              <option value="days">Days</option>
              <option value="newest-first">Newest First</option>
              <option value="oldest-first">Oldest First</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          {sortOption === "days" && sortedHabits.length > 0
            ? sortedHabits.map(({ day, habits }) => {
                console.log({ day, habits });
                return (
                  <React.Fragment key={day}>
                    <h4 className="text-lg font-semibold pb-1 border-b-2">
                      {day}
                    </h4>

                    {habits.length > 0 ? (
                      <div className="flex flex-col gap-8 mb-4">
                        {habits.map((habit) => {
                          console.log({ habit });
                          return (
                            <React.Fragment key={habit._id}>
                              <HabitDetails habit={habit} noCompleteState />
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ) : (
                      <p className=" -mt-6 mb-4">No items to show</p>
                    )}
                  </React.Fragment>
                );
              })
            : sortedHabits.map((habit) => {
                console.log({ habit });
                return (
                  <React.Fragment key={habit._id}>
                    <HabitDetails habit={habit} noCompleteState />
                  </React.Fragment>
                );
              })}

          {!loading && allHabits.length < 1 && (
            <div className="text-center mt-8">Your HABITit list is empty</div>
          )}
          {loading && <div className="loader m-auto mt-12"></div>}
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

export default FullList;
