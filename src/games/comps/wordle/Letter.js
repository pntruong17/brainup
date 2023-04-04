import React, { useContext, useEffect } from "react";
import { WordleContext } from "@/games/Wordle";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(WordleContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div
      className="border border-slate-600 font-sans text-3xl font-bold w-14 h-14 m-px flex items-center justify-center"
      id={letterState}
    >
      {letter}
    </div>
  );
}

export default Letter;
