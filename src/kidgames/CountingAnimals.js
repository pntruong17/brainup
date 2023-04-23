import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useReducer, useRef, useState } from "react";
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import AnimatedTextWord from "@/components/AnimatedTextWord";

const CountingAnimals = () => {
  const sometext = [
    "Good luck with\n your game!\n I hope you excel\n and make it\n through to the\n next level.",
    "Keep up the good work,\n little one!\n You're doing great.\n I believe in you.",
    "May your skills\n and hard work\n pay off in this game.\n You've got this!",
    "Don't give up, kiddo!\n Keep trying and\n you'll get better\n with every attempt.",
    "I'm cheering you on\n from the sidelines!\n Go out there\n and show everyone\n what you're made of.",
    "Wishing you all the best\n as you play your game!\n May you have fun\n and do your best.",
    "You're a natural\n at this game!\n Have fun and\n show off your\n amazing skills.",
    "Good luck, little gamer!\n May you have a blast and\n achieve all\n your goals in the game.",
    "Remember to take\n a deep breath\n and focus on\n your strategy.\n I'm rooting for you!",
    "Play with passion\n and give it your all.\n You're destined\n for greatness!",
    "I know you've got\n the talent\n and determination to\n succeed in this game.\n Keep pushing yourself!",
    "You're a superstar\n in the making!\n Keep practicing and\n improving your game.",
    "I have faith in your abilities\n to surpass this level.\n Believe in yourself\n and keep going!",
    "May your gaming\n skills be sharp\n and your spirit be strong.\n Go forth and conquer\n the game!",
  ];

  const gameInfor = {
    name: "Count Animal",
    desc: "Some text describing",
    context: "Some text describing context",
    image:
      "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg",
  };
  const gamedata = [
    {
      url: "https://play-lh.googleusercontent.com/_uEYCl2eZmQ0iy-ZBQDlAdoJ6Z3kYyjID1Th1MyhdqIKr_x3vHwOfUaK9YNbqZYL2xQ=w526-h296-rw",
      among: 1,
    },
    {
      url: "https://play-lh.googleusercontent.com/B7v7r7wkc4HnSMsuTxXWeJJ-QKmO8n5al8Z8RwmDa3uVWpVoIEvunPekbOahfcPK8Q0=w526-h296-rw",
      among: 2,
    },
    {
      url: "https://play-lh.googleusercontent.com/_uEYCl2eZmQ0iy-ZBQDlAdoJ6Z3kYyjID1Th1MyhdqIKr_x3vHwOfUaK9YNbqZYL2xQ=w526-h296-rw",
      among: 3,
    },
    {
      url: "https://play-lh.googleusercontent.com/B7v7r7wkc4HnSMsuTxXWeJJ-QKmO8n5al8Z8RwmDa3uVWpVoIEvunPekbOahfcPK8Q0=w526-h296-rw",
      among: 4,
    },
  ];

  const TIMER = 3000; //18000;
  const STATES = [
    "context",
    "pre-screen",
    "timego",
    "timeout",
    "next-question",
    "game-close",
    "game-reset",
  ];

  const parentRef = useRef();

  const gameInit = {
    state: STATES[5],
    currentQuestion: 0,
    combo: 0,
    point: 0,
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
      case "next-question":
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
        };
      case "game-close":
        return {
          ...state,
          state: STATES[5],
        };
      default:
        return state;
    }
  };
  const lottieRef = useRef(null);
  const [gameState, dispatchGameState] = useReducer(gameReducer, gameInit);
  const [options, setOptions] = useState();
  const [rightSignal, setRightSignal] = useState(undefined);
  const [wrongSignal, setWrongSignal] = useState(undefined);
  const [thisQuestion, setThisQuestion] = useState(undefined);
  const [mixedQuestion, setMixedQuestion] = useState(undefined);
  //next question
  const handleNext = () => {
    setRightSignal(undefined);
    setWrongSignal(undefined);
    if (gameState.currentQuestion >= mixedQuestion.length - 1) {
      //game closed
      console.log("game closed");
      dispatchGameState({ type: "game-close" });
    } else {
      dispatchGameState({ type: "next-question" });
    }
  };

  // check answers
  function checkAnswer(op) {
    if (wrongSignal !== undefined || rightSignal !== undefined) return;
    if (op === thisQuestion.among) {
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
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
    let newArr = [...gamedata];
    let shuffledArr = shuffleArray(newArr);
    setMixedQuestion(shuffledArr);
    setThisQuestion(shuffledArr[currentQuestion]);
    const randomNumbers = generateRandomNumbers(
      shuffledArr[currentQuestion].among
    );
    setOptions(randomNumbers);
  }, []);

  //timer - prepare
  useEffect(() => {
    if (gameState.state !== STATES[1]) return;

    let timeref = null;
    timeref = setTimeout(() => {
      dispatchGameState({ type: "timego" });
      clearTimeout(timeref);
    }, 500);

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

  // update new question
  useEffect(() => {
    if (gameState.state === STATES[0] || gameState.state === STATES[5]) return;
    dispatchGameState({ type: "pre-screen" });
    const randomNumbers = generateRandomNumbers(
      mixedQuestion[gameState.currentQuestion]?.among
    );
    setOptions(randomNumbers);

    setThisQuestion(mixedQuestion[gameState.currentQuestion]);
  }, [gameState.currentQuestion]);

  //console
  useEffect(() => {
    //console.log("current question", gameState.currentQuestion);
    console.log("thisquestion", thisQuestion);
    //console.log("point", gameState.point);
  }, [gameState, thisQuestion, mixedQuestion]);
  return (
    <>
      {gameState.state === STATES[0] && (
        <div className="w-full h-full">
          <div className="relative w-full min-h-[350px] overflow-hidden">
            <Image
              src={
                gameInfor.image ||
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
                {gameInfor?.context ||
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
      {gameState.state !== STATES[0] && gameState.state !== STATES[5] && (
        <>
          <div className="w-full h-full relative" ref={parentRef}>
            <motion.div
              drag
              dragConstraints={parentRef}
              className="relative w-[2000px] h-full"
            >
              <Image
                style={{ pointerEvents: "none" }}
                src={
                  thisQuestion?.url ||
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
                    <h3 className="text-center text-xl xs:text-4xl font-black tracking-tighter p-10 rounded-3xl bg-orange-50">
                      <AnimatedTextWord text={shuffleArray(sometext)[0]} />
                    </h3>
                  </div>
                </motion.div>
              )}
              {gameState.state === STATES[3] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full border h-full absolute bottom-0 z-10  bg-transparent flex flex-wrap justify-center items-center"
                >
                  {options &&
                    options.map((option) => (
                      <div
                        onClick={() => checkAnswer(option)}
                        key={option}
                        className={`${
                          rightSignal && option === thisQuestion.among
                            ? "user-correct shake-element"
                            : ""
                        } ${
                          wrongSignal === option &&
                          option !== thisQuestion.among
                            ? "user-incorrect"
                            : ""
                        } bg-orange-50 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] flex justify-center items-center rounded-full  m-auto border-b-[12px] border-green-200 hover:border-b-8 duration-100 cursor-pointer`}
                      >
                        <h3 className="text-center text-5xl xs:text-7xl font-black tracking-tighter select-none">
                          {option}
                        </h3>
                      </div>
                    ))}
                  {rightSignal !== undefined && wrongSignal === undefined && (
                    <div className="absolute top-5 w-full h-full">
                      <div className="absolute sun -bottom-[1000px] md:-bottom-[500px] -left-[800px] md:-left-[500px]"></div>
                    </div>
                  )}
                  {rightSignal !== undefined && (
                    <div className="absolute bottom-5 w-full flex justify-center px-3">
                      <button
                        onClick={handleNext}
                        className="py-2 px-5 text-center text-2xl xs:text-5xl font-black bg-white rounded-full border-b-4 border-green-200 hover:border-b-2 duration-100"
                      >
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
                    gameState.state === STATES[2] ? "animate-rotation-18" : ""
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
      {gameState.state === STATES[5] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full top-0 left-0 absolute bg-orange-50/[0.9] overflow-hidden"
        >
          <div className="w-full h-full flex flex-col justify-center">
            <div className="absolute top-5 w-full h-full opacity-10">
              <div className="absolute sun -bottom-[1000px] md:-bottom-[500px] -left-[800px] md:-left-[500px]"></div>
            </div>
            <iframe src="https://embed.lottiefiles.com/animation/31174"></iframe>
            <div className="w-full flex border-4 justify-center">
              <div className="w-40 h-40 border-4">
                <iframe src="https://embed.lottiefiles.com/animation/97585"></iframe>
              </div>
              <div className="w-40 h-40">
                <iframe src="https://embed.lottiefiles.com/animation/97585"></iframe>
              </div>
            </div>
            <h3 className="text-center text-2xl xs:text-5xl font-black tracking-tighter select-none">
              asdkjalsjdlj alsjdas djkljf ljhdlghdjkl
            </h3>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CountingAnimals;
