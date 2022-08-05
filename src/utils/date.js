import { useState } from "react";

export const days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];

function useDay() {
   const [day, setDay] = useState(days[new Date().getDay()]);
   return { day, setDay };
}

function useDate() {
   const { day, setDay } = useDay();
   const [d, setD] = useState(new Date());
   const [today, setToday] = useState(day);

   setInterval(() => {
      setD(new Date());
      setToday(days[new Date().getDay()]);
      if (day !== today) {
         console.log({ day, today });
         setDay(today);
      }
   }, 1000);

   const hour = d.getHours();
   const minute = d.getMinutes();
   const second = d.getSeconds();
   const h = () => (
      <div className="w-8 inline-block justify-center items-center">{`${
         hour < 10 ? "0" : ""
      }${hour}`}</div>
   );
   const m = () => (
      <div className="w-8 inline-block justify-center items-center">{`${
         minute < 10 ? "0" : ""
      }${minute}`}</div>
   );
   const s = () => (
      <div className="w-8 inline-block justify-center items-center">{`${
         second < 10 ? "0" : ""
      }${second}`}</div>
   );

   const time = [h(), ":", m(), ":", s()];

   return { hour, minute, second, time };
}

export { useDate, useDay };
