import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckAndXMark from "./comps/CheckAndXMark";
import NavbarFixed from "@/components/NavbarFixed";
import ScoreBoard from "@/components/subcomponents/ScoreBoard";
import { checkCookies, setCookies, getCookies } from "@/components/cookie";
import { useRouter } from "next/router";

const FastMatch = () => {
  const router = useRouter();
  const TIME_GAME = 40;

  const [ingredient, setIngredient] = useState(
    [
      { icon: "🍅", label: "Tomato" },
      { icon: "🥬", label: "Lettuce" },
      { icon: "🧀", label: "Cheese" },
      { icon: "🥕", label: "Carrot" },
      { icon: "🍌", label: "Banana" },
      { icon: "🍇", label: "Grapes" },
      { icon: "🥂", label: "Champers?" },
      { icon: "🥝", label: "Kiwi" },
      { icon: "🧊", label: "Ice" },
      { icon: "🍫", label: "Chocolate" },
      { icon: "🍭", label: "Lollipop" },
    ].sort(() => Math.random() - 0.5)
  );

  const [showScore, setShowScore] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(true);
  const [pointCookies, setPointCookies] = useState();

  const [comboTimer, setComboTimer] = useState(0);
  const [timer, setTimer] = useState(TIME_GAME);
  const [point, setPoint] = useState(0);
  const comboRef = useRef(0);
  const [signal, setSignal] = useState(-1);

  const [start, setStart] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const [btnPress, setBtnPress] = useState(false);
  const [close, setClose] = useState(false);

  const [checkbullshit, setCheckbullshit] = useState(0);
  const [isRight, setIsRight] = useState(true);
  const [selected, setSelected] = useState(() => {
    const symbols = [ingredient[0].icon, ingredient[1].icon];
    return symbols[Math.floor(Math.random() * symbols.length)];
  });
  const [newSelect, setNewSelect] = useState();

  const getRandomSymbol = () => {
    const symbols = [ingredient[0].icon, ingredient[1].icon];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const newTurn = () => {
    setSelected(newSelect);
    setNewSelect((prev) => getRandomSymbol());
  };

  const checkMatched = (_signal) => {
    //setCount((prev) => prev + 1);
    let result = newSelect === selected ? true : false; // =====> OK but why i using keyboard, the result always return false???????
    if (result === _signal) {
      // nguoi dung` chon dung
      comboRef.current++;
      if (!btnPress) {
        setSignal(1);
      } else {
        setSignal(-1);
      }
      if (gameStart) {
        setPoint((prev) => prev + 10 + comboRef.current);
        if (comboTimer >= 5) {
          setTimer((prev) => prev + 2);
          setComboTimer(0);
        } else {
          setComboTimer((prev) => prev + 1);
        }
      }
    } else {
      //nguoi dung chon sai
      comboRef.current = 0;
      if (!btnPress) {
        setSignal(0);
      } else {
        setSignal(-1);
      }
      setComboTimer(0);
    }
  };
  const handleStart = () => {
    setBtnPress(true);
    setStart(true);
    setCheckbullshit((prev) => prev + 1);
  };
  const handleRestart = () => {
    setBtnPress(true);
    setPoint(0);
    comboRef.current = 0;
    setClose(false);
    setTimer(TIME_GAME);
    handleStart();
  };

  useEffect(() => {
    setSelected(getRandomSymbol());
  }, []);

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

  // end cookies data
  useEffect(() => {
    newTurn();
    checkMatched(isRight);
  }, [checkbullshit]);

  const handleArrowRight = () => {
    setGameStart(true);
    setBtnPress(false);
    setIsRight(true);
    setCheckbullshit((prev) => prev + 1);
  };
  const handleArrowLeft = () => {
    setGameStart(true);
    setBtnPress(false);
    setIsRight(false);
    setCheckbullshit((prev) => prev - 1);
  };

  useEffect(() => {
    if (!start || close) return;
    const keyDownHandler = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        setGameStart(true);
        setBtnPress(false);
        setIsRight(true);
        setCheckbullshit((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setGameStart(true);
        setBtnPress(false);
        setIsRight(false);
        setCheckbullshit((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [start, close]);

  // timer

  const changeTimeCode = (sec) => {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec > 59) {
      sec = "00";
    }
    return sec;
  };
  const renderTimer = () => {
    let munite = Math.floor(timer / 60);
    let second = timer % 60;
    return "" + changeTimeCode(munite) + ":" + changeTimeCode(second);
  };
  const tinhDiem = () => {
    const numCookies = getCookies("_USER_COOKIES_TRIVIA_LVL");
    const newPoint = Number(numCookies) + Number(point);
    setCookies("_USER_COOKIES_TRIVIA_LVL", newPoint);
    setPointCookies(newPoint);
  };
  useEffect(() => {
    if (!start || close) return;
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
      if (timer <= 0) {
        setGameStart(false);
        setTimer(0);
        setClose(true);
        tinhDiem();
        setShowScore(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, start, close]);

  useEffect(() => {
    if (!showScoreBoard) {
      router.push("/brain-games");
    }
  }, [showScoreBoard]);
  return (
    <>
      <NavbarFixed />
      {showScore && (
        <div className="absolute z-10 top-0 left-0 w-full h-screen bg-_bg_dark py-16">
          <ScoreBoard
            closeButton={true}
            correct={point}
            pointCookies={pointCookies}
            setShowScoreBoard={setShowScoreBoard}
          />
        </div>
      )}
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col response-gridx bg-_accent_dark dark:bg-_secondary_dark rounded-lg box-shadow-framer overflow-hidden">
          <div className="flex flex-nowrap justify-between p-4 border-b border-_accent bg-_accent_dark dark:bg-_secondary_dark">
            <h3 className="border rounded-full px-2 text-center text-sm font-medium">
              {"Score: " + point}
            </h3>
            <h3 className="rounded-full px-2 text-center text-sm font-medium">
              Time remaining: {renderTimer()}
            </h3>
          </div>
          <div className="max-w-md mx-auto mt-10">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={checkbullshit}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex w-56 h-56 mx-auto text-9xl font-black text-center justify-center items-center"
              >
                {newSelect ? newSelect : selected}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full flex h-28 justify-center">
            <button
              onClick={handleStart}
              disabled={start && !close ? true : false}
              className={`${
                start ? "hidden" : ""
              } flex justify-center items-center rounded-full w-28 h-12 bg-_blue m-1 hover:box-shadow-framer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={handleRestart}
              className={`${
                !close ? "hidden" : ""
              } flex justify-center items-center rounded-full w-28 h-12 border bg-_blue m-1 hover:box-shadow-framer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <CheckAndXMark signal={signal} checkChange={checkbullshit} />
          </div>
          <div className="w-full flex-1 flex justify-center mx-auto mt-10 bg-_accent_dark dark:bg-_secondary_dark">
            <button
              disabled={!start || close ? true : false}
              onClick={handleArrowLeft}
              className="w-1/2 h-full border-t border-_accent font-bold text-sm hover:text-lg transition-all duration-100 ease outline-none"
            >
              NOT
            </button>
            <button
              disabled={!start || close ? true : false}
              onClick={handleArrowRight}
              className="w-1/2 h-full border-t border-l border-_accent text-_blue font-bold text-sm hover:text-lg transition-all duration-100 ease outline-none"
            >
              MATCH
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FastMatch;
