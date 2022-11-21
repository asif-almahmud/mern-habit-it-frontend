import axios from "axios";
import React, { useState } from "react";
import { useHabitsContext } from "../hooks/useHabitsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link, useNavigate } from "react-router-dom";

const HabitDetails = ({ habit, noCompleteState = false }) => {
  const { _id, title, reps, createdAt, isDone } = habit;
  const { dispatch } = useHabitsContext();
  const navigate = useNavigate();

  const iconStyle =
    "flex justify-center items-center cursor-pointer hover:bg-[#dbf0db] w-[28px] h-[28px] rounded-full active:bg-[#bce4bc] duration-500";

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/habits/${_id}`);
      const data = await res.data;
      console.log({ deleted: data });
      if (data) {
        dispatch({ type: "DELETE_HABIT", payload: _id });
      }
    } catch (err) {
      console.log(err);
      alert(err.message);

      // setNewHabit("");
      // setReps([]);
    }
  };

  const handleEdit = () => {
    dispatch({ type: "TO_BE_EDITED", payload: habit });
    navigate("/edit");
  };

  const handleIsDone = async () => {
    const payload = { title, reps, isDone: !isDone };

    try {
      const res = await axios.patch(`/api/habits/${_id}`, payload);
      const data = res.data;
      console.log({ upDatedForIsDone: data });

      if (data) {
        dispatch({ type: "UPDATE_HABIT", payload: data });
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div
      className={` p-4 px-8 border border-gray-200 rounded-md duration-500 ${
        !noCompleteState && isDone ? "bg-[#f0fff0]" : "bg-white/70"
      } ${!noCompleteState && isDone ? "" : "hover:bg-[#f9fff9]"} `}
    >
      <h4 className="text-lg font-semibold text-[#529B7C]">{title}</h4>
      <div className="text-sm text-slate-500">
        Reps : {reps.length === 7 ? "Everyday" : reps.join(", ")}
      </div>
      <div className="text-sm text-slate-500">
        Created&nbsp;
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </div>
      <div className="flex gap-3 mt-1">
        {!noCompleteState && (
          <i
            className={`ml-auto fa fa-check ${iconStyle} ${
              isDone
                ? "bg-green-800 text-white hover:bg-green-800 active:bg-green-700"
                : ""
            }`}
            onClick={handleIsDone}
          ></i>
        )}

        <i
          className={`${
            noCompleteState ? "ml-auto" : ""
          } fa fa-edit ${iconStyle}`}
          onClick={handleEdit}
        ></i>

        <i className={` fa fa-trash ${iconStyle}`} onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default HabitDetails;
