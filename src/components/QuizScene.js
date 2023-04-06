import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import questions from "./questions";
import QuizOption from "./subcomponents/QuizOption";
import Pagination from "./subcomponents/Pagination";
import Step from "./subcomponents/Step";

let hiddenClass = "hidden";
let nowQuizRef;
let res = {
  wrongQuizs: [],
  percentCorrect: 0,
  time: 0,
};
//--------------------------------------
const QuizScene = ({ changeScene, result, setResult }) => {
  const steps_ = [
    "Đây là bài test IQ của bạn và sau đây là những điều cần lưu ý",
    "Sẽ có 30 câu hỏi, bạn có 900 giây để trả lời hết tất cả",
    "Hãy chắc rằng bạn đang cảm thấy thoải mái nhất, hãy tìm một nơi yên tỉnh để thực hiện bài test",
    "Nếu tâm trạng bạn không tốt, hãy quay lại đây khi khác vì nếu bạn cố gắng bài test sẽ không chính xác",
    "Nếu bạn thật sự sẵn sàng hãy nhấn nút LET'S GO, thời gian sẽ chạy!",
  ];
  const steps = [
    "These are the instructions for your IQ test",
    "There will be 30 questions, and you have 900 seconds to answer all of them.",
    "Make sure you feel comfortable and find a quiet place to take the test.",
    "If you're not feeling well, come back later. When you're not feeling well, your answers might not be accurate.",
    "If you're ready, click the LET'S GO button to start the timer!",
  ];
  const [state, setState] = useState("prepare"); // prepare->quiz->close
  const [currentquiz, setCurrentquiz] = useState(0);
  const [userOptions, setUserOptions] = useState(() =>
    questions.map((qi) => "")
  );
  const [section, setSection] = useState([
    { range: 8, title: "General Logical Reasoning Section" },
    { range: 14, title: "Numerical Reasoning Section" },
    { range: 22, title: "High Logical Reasoning Section" },
    { range: 30, title: "Spatial Reasoning Section" },
  ]);
  const [showTitle, setShowTitle] = useState("");
  const [hbar, setHbar] = useState("25%");
  const [timer, setTimer] = useState(900); // 900s
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (state === "prepare") return;
    if (start) {
      tick.current = setInterval(() => {
        setTimer((preTimer) => preTimer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const startQuiz = () => {
    setStart(true);
    setState("quiz");
  };

  const renderTimer = () => {
    let munite = Math.floor(timer / 60);
    let second = timer % 60;
    return "" + changeTimeCode(munite) + ":" + changeTimeCode(second);
  };

  useEffect(() => {
    nowQuizRef = currentquiz;
    if (currentquiz < section[0].range) {
      setShowTitle(section[0].title);
    } else if (currentquiz < section[1].range) {
      setShowTitle(section[1].title);
    } else if (currentquiz < section[2].range) {
      setShowTitle(section[2].title);
    } else {
      setShowTitle(section[3].title);
    }
  }, [currentquiz]);

  useEffect(() => {
    // show & scroll to submit button
    const isFinishAnswer = userOptions.filter((arr) => arr === "").length <= 0;
    hiddenClass = isFinishAnswer ? "" : "hidden";
    document
      .getElementById("submit-quiz")
      .scrollIntoView({ behavior: "smooth" });

    // Go To Next UnCompleted Quiz
    const isEmptyAfterNowQuiz = userOptions.findIndex(
      (el, i) => el === "" && i >= nowQuizRef
    );
    const isEmptyBeforeNowQuiz = userOptions.findIndex((el, i) => el === "");
    if (isEmptyBeforeNowQuiz < 0) return;
    if (isEmptyAfterNowQuiz >= 0) {
      setCurrentquiz(isEmptyAfterNowQuiz);
    } else {
      setCurrentquiz(isEmptyBeforeNowQuiz);
    }
  }, [userOptions]);

  const changeTimeCode = (sec) => {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec > 59) {
      sec = "00";
    }
    return sec;
  };
  const handleBackArrow = () => {
    if (currentquiz === 0) return;
    setCurrentquiz((prevState) => prevState - 1);
  };
  const handleNextArrow = () => {
    if (currentquiz === userOptions.length - 1) return;
    setCurrentquiz((prevState) => prevState + 1);
  };
  const checkTheResult = () => {
    const time = timer;
    let wrongChoice = [];
    let thequizanswer = questions.map((ques) =>
      ques.answerOptions.filter((op) => op.isCorrect === true)
    );
    for (let i = 0; i < userOptions.length; i++) {
      if (
        thequizanswer[i][0].answerText !== userOptions[i] ||
        userOptions[i] === ""
      ) {
        wrongChoice.push(i);
      }
    }

    let per =
      ((questions.length - wrongChoice.length) / questions.length) * 100;
    res = {
      wrongQuizs: wrongChoice,
      percentCorrect: per + time / 900,
      time: time,
    };
    setResult(res);
    changeScene("Finish");
  };
  const submitResult = () => {
    setStart(false);
    checkTheResult();
  };
  useEffect(() => {
    if (timer <= 0) {
      setStart(false);
      checkTheResult();
    }
  }, [timer]);

  return (
    <>
      <Step steps={steps} setStart={startQuiz} delay={1000} />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-600 body-font bg-_darkblue"
      >
        <div className="h-screen max-w-5xl px-5 py-5 mx-auto">
          <div className="flex flex-col">
            <div className="flex justify-center my-2 md:my-6">
              <h4 className="font-Inter font-semibold text-sm text-center text-blue-500 bg-blue-200 rounded-full px-10 py-1">
                {showTitle}
              </h4>
            </div>
            <div className="flex flex-row justify-between my-2">
              <svg
                onClick={() => handleBackArrow()}
                className="btn-rounded cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="pl-1 text-white font-sans font-semibold">
                  {renderTimer()}
                </h3>
              </div>

              <svg
                onClick={() => handleNextArrow()}
                className="btn-rounded cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            <div className="flex flex-wrap bg-white rounded-lg ring-1 overflow-hidden">
              <div className="w-full h-1 ">
                <div className={`w-[${hbar}] h-full bg-_blue/[0.68]`}></div>
              </div>
              <div className="p-5 md:w-1/2">
                <div className="h-full overflow-hidden">
                  <img
                    className="w-full h-full object-scale-down object-center"
                    src={
                      "/images/" + questions[currentquiz].questionText + ".jpg"
                    }
                    alt="blog"
                  />
                </div>
              </div>
              <div className="p-5 md:w-1/2">
                <div className="h-full">
                  <div className="grid grid-cols-2 gap-2">
                    {questions[currentquiz].answerOptions.map((item, i) => (
                      <QuizOption
                        key={i}
                        option={item}
                        currentquiz={currentquiz}
                        setCurrentquiz={setCurrentquiz}
                        userOptions={userOptions}
                        setUserOptions={setUserOptions}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => submitResult()}
                id="submit-quiz"
                className={`${hiddenClass} btn w-full mt-5`}
              >
                Submit!
              </button>
            </div>
            <div className="flex flex-wrap justify-center mx-10 my-5">
              {userOptions.map((item, i) => {
                return (
                  <Pagination
                    key={i}
                    index={i}
                    item={item}
                    currentquiz={currentquiz}
                    setCurrentquiz={setCurrentquiz}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default QuizScene;
