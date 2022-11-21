import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { days } from "../utils/date";

// styles with many classes and same classes
const styles = {
  inputStyle:
    "bg-white/60 px-4 py-1 outline outline-1 outline-slate-300/70 text-sm rounded-full focus:rounded-full focus:outline-2 focus:outline-[#92dbbC]",
  selected:
    "bg-[#529B7C] text-white px-3 py-1 border rounded-full text-xs cursor-pointer outline outline-2 outline-[#92dbbC]",
  notSelected:
    "px-3 py-1 border border-slate-300/70 rounded-full text-xs cursor-pointer bg-white/60 hover:bg-gray-100",
  rowCenter: "flex justify-center items-center",
  colCenter: "flex flex-col justify-center items-center gap-2",
};

const AddNewHabitForm = ({ edit = false }) => {
  const [newHabit, setNewHabit] = useState("");
  const [reps, setReps] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ newHabit: "", reps: "" });
  const [shouldWait, setShouldWait] = useState(false);
  const { dispatch } = useHabitsContext();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { toBeEdited } = useHabitsContext();

  console.log({ toBeEdited });

  const handleOnClickEveryday = () => {
    setErrorMessage((errorMessage) => {
      return { ...errorMessage, reps: "" };
    });
    if (reps.length < 7) {
      setReps(days);
    }
    if (reps.length === 7) {
      setReps([]);
    }
  };

  const handleOnClickSpecificDay = (day) => {
    setErrorMessage((errorMessage) => {
      return { ...errorMessage, reps: "" };
    });
    if (!reps.includes(day)) {
      setReps([...reps, day]);
    } else if (reps.includes(day)) {
      setReps(reps.filter((item) => item !== day));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newHabit.trim().length === 0 || reps.length === 0) {
      newHabit.trim().length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, newHabit: "Required" };
        });
      reps.length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, reps: "Select at least one day" };
        });
    } else {
      if (!edit) {
        setShouldWait(true);
        const orderedReps = days.filter((day) => reps.includes(day));
        const payload = {
          title: newHabit,
          reps: orderedReps,
          isDone: false,
        };
        try {
          const res = await axios.post("/api/habits", payload);
          const data = res.data;
          console.log({ data });

          if (data) {
            console.log({ posted: data });
            dispatch({ type: "ADD_HABIT", payload: data });
            setNewHabit("");
            setReps([]);
            setShouldWait(false);
            if (pathname.includes("create")) {
              navigate("/");
            }
          }
        } catch (err) {
          console.log(err);
          alert(
            err.message +
              ". May be you didn't fill all the fields. Otherwise please check your internet connection."
          );
          setShouldWait(false);
        }
      }

      if (edit) {
        setShouldWait(true);
        const orderedReps = days.filter((day) => reps.includes(day));
        const payload = {
          title: newHabit,
          reps: orderedReps,
          isDone: toBeEdited.isDone,
        };
        try {
          const res = await axios.patch(
            `/api/habits/${toBeEdited._id}`,
            payload
          );
          const data = res.data;
          console.log({ data });

          if (data) {
            console.log({ posted: data });
            dispatch({ type: "UPDATE_HABIT", payload: data });
            setNewHabit("");
            setReps([]);
            setShouldWait(false);
            if (pathname.includes("edit")) {
              navigate("/");
            }
          }
        } catch (err) {
          console.log(err);
          alert(
            err.message +
              ". May be you didn't fill all the fields. Otherwise please check your internet connection."
          );
          setShouldWait(false);
        }
      }
    }
  };

  useEffect(() => {
    if (edit) {
      setNewHabit(toBeEdited.title);
      setReps(toBeEdited.reps);
    }
  }, []);

  return (
    <div className={`${styles.colCenter} gap-6`}>
      <div className={`${styles.rowCenter} font-medium`}>
        {!edit ? "Add New Work to Daily" : "Edit the Selected"}
        <span className="tracking-wide font-medium text-[#529B7C]">
          &nbsp;HABITit&nbsp;
        </span>
        {!edit ? "List" : ""}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.colCenter} gap-4`}>
          <div className={styles.colCenter}>
            <h4>Make a habit of :</h4>
            <input
              name="newHabit"
              id="newHabit"
              value={newHabit}
              onChange={(e) => {
                setNewHabit(e.target.value);
                setErrorMessage((errorMessage) => {
                  return { ...errorMessage, newHabit: "" };
                });
              }}
              placeholder="Doing something..."
              className={styles.inputStyle}
            />
            <p className="text-red-400">{errorMessage.newHabit}</p>
          </div>
          <div className={styles.colCenter}>
            <h4 className="text-center">Repeat it :</h4>
            <div className={`${styles.rowCenter} gap-2 flex-wrap`}>
              <span
                className={`${
                  reps.length === 7 ? styles.selected : styles.notSelected
                }`}
                onClick={handleOnClickEveryday}
              >
                Everyday
              </span>
              {days.map((day) => (
                <span
                  key={day}
                  className={`${
                    reps.includes(day) ? styles.selected : styles.notSelected
                  }`}
                  onClick={() => {
                    handleOnClickSpecificDay(day);
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
            <p className="text-red-400">{errorMessage.reps}</p>
          </div>

          <div className={`${styles.rowCenter} font-semibold`}>
            {!shouldWait ? (
              <input
                type="submit"
                value="Submit"
                className="bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full cursor-pointer active:border-gray-500/80 active:outline active:outline-[#92dbbC] transition-colors ease-in-out duration-300"
              />
            ) : (
              <button
                type="submit"
                disabled
                className="bg-white/60 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full"
              >
                Please wait...
              </button>
            )}
          </div>
        </div>
      </form>
      <div className={`${styles.rowCenter} font-semibold mt-4`}>
        {(pathname.includes("create") || pathname.includes("edit")) && (
          <button
            className="bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full cursor-pointer active:border-gray-500/80 active:outline active:outline-[#92dbbC] transition-colors ease-in-out duration-300"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNewHabitForm;
