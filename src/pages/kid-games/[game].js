import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useReducer, useRef, useState } from "react";

const Game = ({ user, game, numberAnimal = 5 }) => {
  const TIMER = 3000; //18000;
  const STATES = [
    "context",
    "pre-screen",
    "timego",
    "timeout",
    "next-button",
    "game-close",
    "game-reset",
  ];

  const parentRef = useRef();

  const gameInit = {
    state: STATES[0],
    currentQuestion: 0,
    combo: 0,
    point: 0,
  };
  //const [currentQuestion, dispatchGameState] = useReducer(gameReducer, gameInit);
  const gameReducer = (state, action) => {
    switch (action.type) {
      case "pre-screen":
        return {
          ...state,
          state: STATES[1],
        };
      case "timego":
        return {
          ...state,
          state: STATES[2],
        };
      case "timeout":
        return {
          ...state,
          state: STATES[3],
        };
      case "correct":
        return {
          ...state,
          combo: state.combo + 1,
          point: state.point + 500 + state.combo * 50,
        };
      case "wrong":
        return {
          ...state,
          combo: 0,
        };
      default:
        return state;
    }
  };

  const [gameState, dispatchGameState] = useReducer(gameReducer, gameInit);
  const [options, setOptions] = useState();
  const [rightSignal, setRightSignal] = useState(undefined);
  const [wrongSignal, setWrongSignal] = useState(undefined);
  // check answers
  function checkAnswer(op) {
    if (wrongSignal !== undefined) return;
    if (op === numberAnimal) {
      //play button right

      setRightSignal(true);
      dispatchGameState({ type: "correct" });
    } else {
      //play button right and wrong
      setRightSignal(true);
      setWrongSignal(op);
      dispatchGameState({ type: "wrong" });
    }
  }
  function generateRandomNumbers(numberAnimal) {
    const result = [numberAnimal];
    while (result.length < 4) {
      const randomNum = Math.floor(Math.random() * 11) + numberAnimal - 5;
      if (
        randomNum > 0 &&
        randomNum !== numberAnimal &&
        !result.includes(randomNum)
      ) {
        result.push(randomNum);
      }
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // initialize game
  useEffect(() => {
    const randomNumbers = generateRandomNumbers(numberAnimal);
    setOptions(randomNumbers);
  }, []);

  //timer - prepare
  useEffect(() => {
    if (gameState.state !== STATES[1]) return;

    let timeref = null;
    timeref = setTimeout(() => {
      dispatchGameState({ type: "timego" });
      clearTimeout(timeref);
    }, 2500);

    return () => clearTimeout(timeref);
  }, [gameState]);

  // Timer - timego
  useEffect(() => {
    if (gameState.state !== STATES[2]) return;

    let timeref = null;
    timeref = setTimeout(() => {
      dispatchGameState({ type: "timeout" });
      clearTimeout(timeref);
    }, TIMER);

    return () => clearTimeout(timeref);
  }, [gameState]);

  //console
  useEffect(() => {
    console.log("state", gameState.state);
    console.log("op", options);
    console.log("point", gameState.point);
  }, [gameState, options]);
  return (
    <>
      <div className="w-full h-screen font-Nunito text-_darkblue p-0 sm:p-3 bg-emerald-400">
        <div className="max-w-md md:max-w-5xl h-full mx-auto bg-orange-50 rounded-none sm:rounded-[50px] overflow-hidden border sm:border-8">
          {gameState.state === STATES[0] && (
            <div className="w-full h-full">
              <div className="relative w-full min-h-[350px] rounded-3xl overflow-hidden">
                <Image
                  src={
                    game?.image ??
                    "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg"
                  }
                  fill
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="w-full p-2 xs:p-5 flex flex-col justify-between items-center">
                <div className="w-full">
                  <h3 className="text-center text-2xl xs:text-3xl font-black tracking-tighter">
                    {game?.context ||
                      "Let's count the number of animal that you can see"}
                  </h3>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => dispatchGameState({ type: "pre-screen" })}
                    className="mx-auto py-2 px-5 text-center text-2xl xs:text-4xl font-black bg-white rounded-full border-b-4 border-green-200 hover:border-b-2 duration-100"
                  >
                    Let&apos;s Go!
                  </button>
                </div>
              </div>
            </div>
          )}
          {gameState.state !== STATES[0] && (
            <>
              <div className="w-full h-full relative" ref={parentRef}>
                <motion.div
                  drag
                  dragConstraints={parentRef}
                  className="relative w-[1000px] h-full"
                >
                  <Image
                    style={{ pointerEvents: "none" }}
                    src={
                      game?.image ??
                      "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg"
                    }
                    fill
                    objectFit="cover"
                    alt="Description of image"
                    layout="fill"
                  />
                </motion.div>
                <AnimatePresence exitBeforeEnter>
                  {gameState.state === STATES[1] && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full top-0 left-0 absolute z-20 bg-orange-50/[0.9]"
                    >
                      <div className="w-full h-full flex justify-center items-center">
                        <h3 className="text-center text-3xl xs:text-4xl font-black tracking-tighter p-10 rounded-3xl bg-orange-50">
                          {game?.title || "Challenge 1"}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence exitBeforeEnter>
                  {gameState.state === STATES[3] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full border h-1/2 absolute bottom-0 z-10 rounded-3xl bg-orange-50/[0.2] flex flex-wrap justify-center items-center"
                    >
                      {options &&
                        options.map((option) => (
                          <div
                            onClick={() => checkAnswer(option)}
                            key={option}
                            className={`${
                              rightSignal && option === numberAnimal
                                ? "user-correct"
                                : ""
                            } ${
                              wrongSignal === option && option !== numberAnimal
                                ? "user-incorrect"
                                : ""
                            } bg-orange-50 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] flex justify-center items-center rounded-full  m-auto border-b-[12px] border-green-200 hover:border-b-8 duration-100 cursor-pointer`}
                          >
                            <h3 className="text-center text-3xl xs:text-4xl font-black tracking-tighter ">
                              {option}
                            </h3>
                          </div>
                        ))}
                      {rightSignal !== undefined &&
                        wrongSignal !== undefined && (
                          <div className="w-full flex justify-center">
                            <button className="py-2 px-5 text-center text-2xl xs:text-4xl font-black bg-white rounded-full border-b-4 border-green-200 hover:border-b-2 duration-100">
                              Next Challenge!
                            </button>
                          </div>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute top-5 left-5">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center relative">
                    <div className="absolute top-[20px] w-2 h-2 bg-teal-800 rounded-full transform"></div>
                    <div
                      className={`absolute top-[4px] w-1 h-5 bg-teal-800 rounded-full transform origin-bottom ${
                        gameState.state === STATES[2]
                          ? "animate-rotation-18"
                          : ""
                      }  `}
                    ></div>
                    <h3 className="text-xs pt-[65px] font-black text-_w_almost text-center whitespace-no-wrap">
                      {gameState.state === STATES[3] ? "OVER" : "TIMER"}
                    </h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
