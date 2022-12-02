import { useEffect } from "react";
import { quotes } from "../data/quotes";

const Quotes = () => {
  let quoteIndex = localStorage.getItem("quote-index");

  console.log({ quotes });
  if (!quoteIndex) {
    localStorage.setItem("quote-index", 0);
  }
  if (+quoteIndex === quotes.length) {
    localStorage.setItem("quote-index", 0);
  }
  quoteIndex = localStorage.getItem("quote-index");

  console.log({ quoteIndex });

  useEffect(() => {
    return localStorage.setItem("quote-index", `${+quoteIndex + 1}`);
  }, []);
  return (
    <div className="text-[#529B7C] mt-6 text-center italic text-lg font-semibold">
      " {quotes[+quoteIndex]} "{" "}
      <span className="text-gray-600 font-semibold text-xs">
        ~ from Atomic Habits
      </span>
    </div>
  );
};

export default Quotes;
