import React from "react";
import { useDate, useDay } from "../utils/date";

const DayAndTime = () => {
   const { time } = useDate();
   const { day } = useDay();

   return (
      <div>
         <h2 className="text-center text-xl font-semibold">{day}</h2>
         <h4 className="text-center text-lg">{time}</h4>
      </div>
   );
};

export default DayAndTime;
