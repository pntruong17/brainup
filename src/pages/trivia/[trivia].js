import React, { useEffect, useReducer, useState } from "react";
import fs from "fs";
import path from "path";
import { motion } from "framer-motion";
import LayoutTrivia from "@/components/LayoutTrivia";
import AnswerButton from "@/trivia/AnswerButton";
import TriviaCard from "@/trivia/TriviaCard";
import TimeBonus from "@/trivia/TimeBonus";
import {
  checkCookies,
  getCookies,
  setCookies,
  updateSingleNumberCookies,
} from "@/components/Cookies";

const Trivia = ({ triviBySlug, triviNotThisQuiz }) => {
  //scoreboard
  const TIMER = 8;
  const STATES = ["start", "timego", "timeout", "answered", "cloded"];
  const CLASS = [
    { title: "Reincarnate", points: 0 },
    { title: "Preschool", points: 2000 },
    { title: "Elementary School", points: 8000 },
    { title: "Middle School", points: 16000 },
    { title: "High School", points: 32000 },
    { title: "Bachelor's Degree", points: 64000 },
    { title: "Master's Degree", points: 120000 },
    { title: "Doctorate Degree", points: 240000 },
    { title: "Professor", points: 500000 },
    { title: "God", points: 1000000 },
  ];

  const [pointCookies, setPointCookies] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActiveTime, setIsActiveTime] = useState(false);

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [questionLeft, setQuestionLeft] = useState(
    triviBySlug.questions.length
  );
  const [trivia, setTrivia] = useState(triviBySlug);
  const [thisQuestion, setThisQuestion] = useState(undefined);
  const [state, setState] = useState(STATES[0]);
  const [correct, setCorrect] = useState(0);
  const [rightWrong, setRightWrong] = useState(undefined);
  const [showCorrect, setShowCorrect] = useState(false);
  const [visibleTimeBonus, setVisibleTimeBonus] = useState(false);
  const [levelPlayer, setLevelPlayer] = useState({
    title: "",
    nextTitle: "",
    percent: undefined,
    xpNeeded: undefined,
  });
  const [chart, setChart] = useState(15);
  // chart
  const radius = 65;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - levelPlayer.percent * circumference;
  //userReducer
  const initGameScore = {
    winstreak: 0,
    combo: 0,
    timeBonus: 0,
    timeBonusStack: 0,
    point: 0,
  };
  const gameReducer = (state, action) => {
    switch (action.type) {
      case "timeout":
        return {
          ...state,
          winstreak: 0,
          combo: 0,
          timeBonus: 0,
        };
      case "rightclick":
        const _timeBonus = (TIMER - seconds) * 10;
        const _stackBonus = (state.combo + 1) * 12;

        return {
          ...state,
          winstreak: state.winstreak + _stackBonus,
          combo: state.combo + 1,
          timeBonus: _timeBonus,
          timeBonusStack: state.timeBonusStack + _timeBonus,
          point: correct * 100,
        };
      case "wrongclick":
        return {
          ...state,
          combo: 0,
          timeBonus: 0,
        };
      case "reset":
        return {
          ...state,
          winstreak: 0,
          combo: 0,
          timeBonus: 0,
          timeBonusStack: 0,
          point: 0,
        };
      default:
        return state;
    }
  };
  const [gameScore, dispatchGameScore] = useReducer(gameReducer, initGameScore);

  const calculateLevelPlayer = () => {
    const _findIndex = CLASS.findIndex((item) => item.points > pointCookies);

    if (_findIndex >= 0) {
      const rangePoints =
        CLASS[_findIndex].points - CLASS[_findIndex - 1].points;
      const nextPoint = pointCookies - CLASS[_findIndex - 1].points;
      const percentage = nextPoint / rangePoints;

      setLevelPlayer({
        ...levelPlayer,
        title: CLASS[_findIndex - 1].title,
        nextTitle: CLASS[_findIndex].title,
        percent: percentage,
        xpNeeded: CLASS[_findIndex].points - pointCookies,
      });
    } else {
      setLevelPlayer({
        ...levelPlayer,
        title: "God",
        nextTitle: "God",
        percent: 1,
        xpNeeded: 0,
      });
    }
  };

  //cookies data
  useEffect(() => {
    const hasCookie = checkCookies("_USER_COOKIES_TRIVIA_LVL");
    if (hasCookie) {
      setPointCookies(getCookies("_USER_COOKIES_TRIVIA_LVL"));
    } else {
      setPointCookies(0);
      setCookies("_USER_COOKIES_TRIVIA_LVL", 0);
    }
  }, []);
  useEffect(() => {
    const newPoints =
      Number(pointCookies) +
      Number(gameScore.winstreak) +
      Number(gameScore.timeBonusStack) +
      Number(gameScore.point);

    console.log("newPoints", newPoints);
    if (state === STATES[4]) {
      updateSingleNumberCookies("_USER_COOKIES_TRIVIA_LVL", newPoints);
      setPointCookies(newPoints);
    }
  }, [state]);

  useEffect(() => {
    calculateLevelPlayer();
  }, [pointCookies]);

  // end cookies data

  const resetFrame = () => {
    dispatchGameScore({ type: "reset" });
    setVisibleTimeBonus(false);
    setSeconds(0);
    setCurrentQuiz(0);
    setQuestionLeft(triviBySlug.questions.length);
    setState(STATES[0]);
    setCorrect(0);
    setShowCorrect(false);
  };

  const checkAnswer = (userAnswer) => {
    setState(STATES[3]);

    if (userAnswer) {
      setRightWrong(true);
      dispatchGameScore({ type: "rightclick" });
      setCorrect((prev) => prev + 1);
    } else {
      setRightWrong(false);
      dispatchGameScore({ type: "wrongclick" });
    }
    setShowCorrect(true);
  };

  const handleNext = () => {
    setSeconds(0);
    setState(STATES[1]);
    setShowCorrect(false);
    setQuestionLeft((prev) => prev - 1);
    setCurrentQuiz((prev) => prev + 1);
  };
  const handleShowResults = () => {
    setState(STATES[4]);
    handleKillTimer();
  };

  const handleStart = () => {
    setIsActiveTime(true);
    console.log("starting");
  };

  const handlePause = () => {
    setIsActiveTime(false);
    console.log("pause");
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActiveTime(false);
  };

  useEffect(() => {
    if (state === STATES[1]) {
      handleStart();
    }
    if (state === STATES[4]) {
      //handleKillTimer();
    }
    if (state === STATES[3]) {
      handlePause();
    }
    if (state === STATES[2]) {
      dispatchGameScore({ type: "timeout" });
      setShowCorrect(true);
      setSeconds(0);
      handlePause();
    }
    console.log("state ", state);
  }, [state]);

  useEffect(() => {
    //console.log("combo", gameScore.combo);
    //console.log("winstreak", gameScore.winstreak);
    //console.log("timeBonus", gameScore.timeBonus);
    //console.log("timeBonusStack", gameScore.timeBonusStack);
    //console.log("correct", correct);
    console.log("pointCookies", pointCookies);
    console.log("levelPlayer", levelPlayer);
  }, [correct, gameScore, pointCookies, levelPlayer]);

  useEffect(() => {
    let interval = null;
    if (seconds >= TIMER) {
      console.log("lon hon 8 giay");
      setState(STATES[2]);
    }
    if (isActiveTime) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActiveTime && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveTime, seconds, state]);

  useEffect(() => {
    const quiz = trivia.questions[currentQuiz];
    setThisQuestion(quiz);
    if (currentQuiz > triviBySlug.questions.length) {
      setState(STATES[4]);
    }
  }, [thisQuestion, currentQuiz]);

  //reset state for other quiz
  useEffect(() => {
    setTrivia(triviBySlug);
    resetFrame();
    //console.log(triviBySlug);
  }, [triviBySlug]);
  return (
    <>
      <LayoutTrivia
        pageMeta={{
          title: triviBySlug.title,
          discription: triviBySlug.expert,
        }}
      >
        <div className="w-full bg-[#16202C] py-8 md:py-12 font-Nunito">
          <h2 className="font-black text-4xl text-center text-_contrast_bg font-Nunito underline sm:mb-8 hidden sm:block">
            {triviBySlug.title}
          </h2>
          <div className="max-w-[680px] min-h-screen shadow-sm mx-auto px-3">
            {thisQuestion && state !== STATES[4] && (
              <div className="w-full h-[600px] rounded-xl overflow-hidden flex flex-col justify-between relative">
                <div className="w-full bg-teal-700 flex justify-between items-center p-3">
                  <div className="w-20 h-16 overflow-hidden rounded-lg hidden sm:block">
                    <img
                      className="object-center object-cover "
                      src={`${triviBySlug.image}`}
                    />
                  </div>
                  <div className="flex">
                    <div className="mx-1 flex flex-col items-center">
                      <div className="w-10 h-10 bg-teal-800  rounded-lg flex items-center justify-center">
                        <h2 className="text-white text-2xl font-black text-center">
                          {correct}
                        </h2>
                      </div>
                      <h3 className="text-xs font-bold text-white">Correct</h3>
                    </div>
                    <div className="mx-1 flex flex-col items-center">
                      <div className="w-10 h-10 bg-teal-800  rounded-lg flex items-center justify-center">
                        <h2 className="text-white text-2xl font-black text-center">
                          {gameScore.combo}
                        </h2>
                      </div>
                      <h3 className="text-xs font-bold text-white text-center">
                        Combo
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center relative">
                      <div className="absolute top-[20px] w-2 h-2 bg-teal-800 rounded-full transform"></div>
                      <div
                        className={`absolute top-[4px] w-1 h-5 bg-teal-800 rounded-full transform origin-bottom ${
                          state === "timego" ? "animate-rotation" : ""
                        }  `}
                      ></div>
                      <h3 className="text-xs pt-[65px] font-black text-_w_almost text-center">
                        TIMER
                      </h3>
                      <TimeBonus
                        visible={visibleTimeBonus}
                        setVisible={setVisibleTimeBonus}
                        timeBonus={gameScore.timeBonus}
                        correct={correct}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white h-[300px] p-5 overflow-hidden flex justify-center relative">
                  {state === STATES[1] && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, type: "tween" }}
                      src={`${thisQuestion.img1}`}
                      className="object-contain object-center h-full"
                      alt=""
                    />
                  )}
                  {thisQuestion.img2 !== null &&
                    (state === STATES[2] || state === STATES[3]) && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, type: "tween" }}
                        src={`${thisQuestion.img2}`}
                        className="absolute top-0 object-contain object-center h-full"
                        alt=""
                      />
                    )}
                </div>
                <div className="w-full bg-white h-[300px] px-3 pb-3 flex flex-col justify-between">
                  <div className="flex flex-wrap">
                    {thisQuestion.answers.map((answer, i) => (
                      <AnswerButton
                        key={i}
                        state={state}
                        currentQuiz={currentQuiz}
                        showCorrect={showCorrect}
                        answers={answer}
                        checkAnswer={checkAnswer}
                      />
                    ))}
                  </div>
                  <div className="flex flex-row-reverse justify-between">
                    <div
                      className={`group flex items-center p-1 font-black text-xl text-_w_match tracking-tight sm:text-2xl hover:underline cursor-pointer ${
                        state === "timeout" || state === "answered"
                          ? "visible"
                          : "invisible"
                      }`}
                    >
                      {currentQuiz === triviBySlug.questions.length - 1 ? (
                        <h3 onClick={() => setState(STATES[4])}>
                          Show Results
                        </h3>
                      ) : (
                        <h3 onClick={handleNext}>Next Question</h3>
                      )}
                    </div>
                    {(state === STATES[2] || state === STATES[3]) &&
                      questionLeft !== 1 && (
                        <h3 className="p-1 text-lg font-bold text-gray-600 tracking-tight">
                          Question left: {questionLeft - 1}
                        </h3>
                      )}
                  </div>
                  <div className="p-2">
                    {(state === STATES[2] || state === STATES[3]) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border rounded-lg"
                      >
                        <p className="p-3 font-semibold tracking-tight">
                          <span className="font-bold text-_orange">Fact: </span>
                          {thisQuestion.fact}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                {state === STATES[0] && (
                  <div className="absolute bottom-0 left-0 w-full h-[510px] p-3 bg-_contrast_bg flex flex-col items-center justify-center border">
                    <h2 className="text-3xl sm:text-5xl tracking-tight font-black mb-10 text-center p-3 text-_contrast_text">
                      {triviBySlug.title}
                    </h2>
                    <h2
                      onClick={() => setState(STATES[1])}
                      className="text-lg sm:text-4xl tracking-tight font-black p-5 border-b-4 border-_accent rounded-lg bg-_accent/[0.8] hover:bg-_accent/[0.9] text-_contrast_text cursor-pointer duration-200"
                    >
                      Start The Quiz
                    </h2>
                  </div>
                )}
              </div>
            )}
            {state === STATES[4] && (
              <div className="w-full h-full p-2 bg-_contrast_bg border rounded-lg pt-16">
                <div className="max-w-[380px] h-auto mx-auto pt-16 pb-3 px-2 rounded-2xl bg-amber-100 border-b-8 border-gray-400/[0.2] relative">
                  <div className="absolute -top-[20px] sm:-top-[35px] xs:left-[22%] sm:left-[75px] sm:w-[230px] sm:h-[80px] bg-blue-400 border-b-8 border-blue-500/[0.9] rounded-lg text-4xl font-bold text-white flex justify-center items-center">
                    Score Board
                  </div>
                  <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_green bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                    <h3 className="font-bold text-xl tracking-tight">
                      1. Win Streak{" "}
                    </h3>
                    <h3 className="font-bold text-xl tracking-tight">
                      {gameScore.winstreak}
                    </h3>
                  </div>
                  <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_accent bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                    <h3 className="font-bold text-xl tracking-tight">
                      2. Timer Bonus{" "}
                    </h3>
                    <h3 className="font-bold text-xl tracking-tight">
                      {gameScore.timeBonusStack}
                    </h3>
                  </div>
                  <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_w_almost bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                    <h3 className="font-bold text-xl tracking-tight">
                      3. Correct{" "}
                    </h3>
                    <h3 className="font-bold text-xl tracking-tight">
                      {gameScore.point}
                    </h3>
                  </div>
                  <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_red bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                    <h3 className="font-black text-2xl tracking-tight">
                      Total:{" "}
                    </h3>
                    <h3 className="font-black text-2xl tracking-tight">
                      {gameScore.winstreak +
                        gameScore.timeBonusStack +
                        gameScore.point}
                    </h3>
                  </div>
                  <h4 className="font-bold text-xl tracking-tight text-center pt-3">
                    Your level:
                  </h4>
                  <div className="w-40 h-40 mx-auto">
                    <svg
                      className="w-40 h-40 overflow-visible"
                      transform="rotate(-90)"
                    >
                      <circle
                        className="text-gray-300 stroke-current "
                        strokeWidth={4}
                        strokeDasharray={circumference}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        fill="none"
                        r={radius}
                        cx="50%"
                        cy="50%"
                      />
                      <circle
                        className="text-blue-500 stroke-current "
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="none"
                        r={radius}
                        cx="50%"
                        cy="50%"
                      />
                      <text
                        className="text-blue-800 font-black text-center origin-center tracking-tighter"
                        transform="rotate(90)"
                        x="50%"
                        y="50%"
                        dominantBaseline="central"
                        textAnchor="middle"
                        fontSize={18}
                      >
                        {levelPlayer.title}
                      </text>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-base tracking-tight text-center p-2">
                    {levelPlayer.xpNeeded} XP needed to reach next level -{" "}
                    {levelPlayer.nextTitle}
                  </h4>
                </div>
                <div className="w-full rounded-md mt-5 ">
                  <div className="font-black text-_contrast_text text-2xl underline text-center my-10">
                    READY FOR YOUR NEXT QUIZ?
                  </div>
                  <div className="w-full sm:w-4/5 mx-auto">
                    {triviNotThisQuiz.map((quiz, i) => {
                      return (
                        <TriviaCard
                          key={i}
                          trivia={quiz}
                          image={`${quiz.image}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutTrivia>
    </>
  );
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "src", "trivia", "triviaData.json");
  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents); // Thay đổi tại đây
  const _pathBySlug = triviaData.questions.map((trivi) => ({
    params: { trivia: trivi.slug },
  }));
  return {
    paths: _pathBySlug,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slugTrivia = params.trivia;
  const filePath = path.join(process.cwd(), "src", "trivia", "triviaData.json");

  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents);
  const triviBySlug = triviaData.questions.filter(
    (trivi) => trivi.slug === slugTrivia
  );
  const triviNotThisQuiz = triviaData.questions.filter(
    (trivi) => trivi.slug !== slugTrivia
  );
  if (triviNotThisQuiz.length > 4) {
    triviNotThisQuiz.slice(0, 4);
  }
  return {
    props: {
      triviBySlug: triviBySlug[0],
      triviNotThisQuiz: triviNotThisQuiz,
    },
  };
};
export default Trivia;
