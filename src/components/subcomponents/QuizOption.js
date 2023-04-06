import React from "react";

let isMarkedClass = "border";

const QuizOption = ({
  option,
  currentquiz,
  setCurrentquiz,
  userOptions,
  setUserOptions,
}) => {
  isMarkedClass =
    userOptions[currentquiz] !== "" &&
    option.answerText === userOptions[currentquiz]
      ? "ring-2"
      : "border";

  const handleAnswer = (op) => {
    let temparr = [...userOptions];
    temparr[currentquiz] = op;
    setUserOptions(temparr);
  };
  return (
    <div
      onClick={() => handleAnswer(option.answerText)}
      className={`flex ${isMarkedClass} mark-option max-h-28 justify-between p-2 items-center rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-100`}
    >
      <h4 className="font-bold text-primary pr-2">{option.answerText}</h4>
      <img
        className="w-full h-full object-scale-down object-center"
        src={"/images/" + option.answerLink + ".jpg"}
        alt="blog"
      />
    </div>
  );
};

export default QuizOption;
