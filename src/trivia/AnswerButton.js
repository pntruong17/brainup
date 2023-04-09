import React, { useEffect, useState } from "react";

const AnswerButton = ({ showCorrect, currentQuiz, answers, checkAnswer }) => {
  const [showWrong, setShowWrong] = useState(false);
  const handleClick = () => {
    checkAnswer(correct);
    setShowWrong(true);
  };

  const { answer, correct } = answers;

  useEffect(() => {
    setShowWrong(false);
  }, [currentQuiz]);

  return (
    <>
      <div className="w-full sm:w-1/3 ">
        <div
          onClick={handleClick}
          className={`m-1 h-auto sm:h-14 rounded-lg border  ${
            showCorrect && correct ? "bg-green-500" : ""
          } ${
            showWrong && !correct ? "bg-_red" : ""
          } border-_w_almost  p-1 flex justify-center items-center cursor-pointer`}
        >
          <h3 className="text-sm text-_darkblue font-black text-center tracking-tight">
            {answer}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AnswerButton;
