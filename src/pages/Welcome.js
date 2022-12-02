import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="grow flex flex-col justify-center max-w-3xl mx-auto m-12 sm:mt-16 md:mt-20 gap-6">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-lg font-semibold text-[#36795d]">
          Hello, Welcome to HABITit
        </h2>
        <div className="flex flex-col justify-center gap-2">
          <p>
            This applicition is built inspired by the book "Atomic Habits"
            written by James Clear. The book showed how powerful can small
            habits be. Take this application as a companion to you to make good
            habits. To make a new habit of doing something you will add that to
            your HABITit list and target particular week days to repeat. The
            list of targetted habits will appear to you on the basis of the
            current day. Thus you will remember and make sure you have done all
            the targetted things for that day.
          </p>
          <p>
            The positive impact of small good habits are huge. Whether small bad
            habits can lead us astray. So let's start making good habits like
            reading books, doing exercises, helping others etc.
          </p>
        </div>
      </div>
      <div>
        If you have not signed up yet please{" "}
        <Link to="/signup" className="underline">
          Signup
        </Link>{" "}
        first , or{" "}
        <Link to="/login" className="underline">
          Login
        </Link>{" "}
        if you have signed up already.
      </div>
    </div>
  );
};

export default Welcome;
