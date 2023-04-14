import React from "react";
import Image from "next/image";
let isMarkedClass = "border";

const QuizOption = ({
  index,
  option,
  currentquiz,
  questions,
  lockButton,
  setCurrentquiz,
  userOptions,
  setUserOptions,
}) => {
  isMarkedClass =
    userOptions[currentquiz] !== "" &&
    option.answerText === userOptions[currentquiz]
      ? "ring-2"
      : "border ";

  const handleAnswer = (op) => {
    if (lockButton) return;
    let temparr = [...userOptions];
    temparr[currentquiz] = op;
    setUserOptions(temparr);
  };
  return (
    <div
      onClick={() => handleAnswer(option.answerText)}
      className={`flex ${isMarkedClass} mark-option min-h-24 justify-between p-2 items-center rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-100`}
    >
      <h4 className="font-bold text-primary pr-2">{option.answerText}</h4>
      <div className="relative w-full h-[100px] sm:h-[130px] relative">
        {option.answerLink ===
          questions[currentquiz].answerOptions[index].answerLink && (
          <Image
            fill
            objectFit="contain"
            src={"/images/" + option.answerLink + ".jpg"}
            alt="answer"
          />
        )}
      </div>
    </div>
  );
};

export default QuizOption;
