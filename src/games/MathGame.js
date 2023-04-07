import NavbarFixed from "@/components/NavbarFixed";
import React, { useState, useEffect, useRef } from "react";
import CheckAndXMark from "./comps/CheckAndXMark";
import MathBoard from "./comps/MathBoard";
import ShowTopScore from "./comps/ShowTopScore";
import {
  checkCookies,
  getCookies,
  setCookies,
  updateCookies,
} from "@/components/Cookies";

const MathGame = () => {
  let timeRef = useRef();
  const TIME_GAME = 60;
  const rand = ["l", "d", "r"];
  const states = ["start", "playing", "close"];
  const [state, setState] = useState("start");
  const [visibleMark, setVisibleMark] = useState(false);
  const [showTopScore, setShowTopScore] = useState(false);

  const [pointCookies, setPointCookies] = useState([]);
  const [soPhepTinh, setSoPhepTinh] = useState(1);
  const maxcomboPoint = 4;
  const [arrayTrai, setArrayTrai] = useState([]);
  const [arrayPhai, setArrayPhai] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [totalMath, setTotalMath] = useState(1);
  const [timer, setTimer] = useState(TIME_GAME);
  const [comboTimer, setComboTimer] = useState(0);

  const [point, setPoint] = useState(0);

  const [comboPoint, setComboPoint] = useState(1);
  const [firstRandom, setFirstRandom] = useState(
    Math.floor(Math.random() * 20) + 10
  );
  const [answer, setAnswer] = useState("");
  const [signal, setSignal] = useState(-1);

  const [totalClick, setTotalClick] = useState(0);
  const [buttonPress, setButtonPressed] = useState("");

  const checkPrime = (_num) => {
    for (let i = 2; i <= 9; i++) {
      if (_num % i === 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  const findSochia = (_randnum) => {
    let temp = [];
    for (let i = 2; i <= 9; i++) {
      if (_randnum % i === 0) {
        temp.push(i);
      }
    }
    if (temp.length > 0) {
      return temp[Math.floor(Math.random() * temp.length)];
    } else {
      return null;
    }
  };

  const returnRandomNumberArray = (_randnum, _sopheptinh) => {
    if (_sopheptinh === 0) return _randnum;
    const maxnum = 30;
    const __sopheptinh = _sopheptinh;
    let __savemaths = [];
    let prevnum = _randnum;

    for (let i = 0; i < __sopheptinh; i++) {
      let randOp = Math.random();

      if (randOp < 0.3 && maxnum / prevnum > 2) {
        //Nhan
        const __result = 2; // Math.floor(Math.random() * (maxnum / prevnum) + 2);
        __savemaths.push([__result, "/", prevnum * __result]);
        prevnum = prevnum * __result;
      } else if (
        randOp < 0.6 &&
        !checkPrime(prevnum) &&
        maxnum / prevnum <= 2
      ) {
        // Chia
        const sochia = findSochia(prevnum);
        __savemaths.push([sochia, "x", prevnum / sochia]);
        prevnum = prevnum / sochia;
      } else if (randOp < 0.8) {
        // tru
        const __result = Math.floor(Math.random() * (prevnum - 1) + 1);
        __savemaths.push([__result, "+", prevnum - __result]);
        prevnum = prevnum - __result;
      } else {
        //Cong
        const __result = Math.floor(Math.random() * (maxnum - prevnum) + 1);
        __savemaths.push([__result, "-", prevnum + __result]);
        prevnum = prevnum + __result;
      }
    }
    return __savemaths;
  };

  const newNumber = () => {
    const newrand = rand[Math.floor(Math.random() * rand.length)];
    if (newrand === "l") {
      setAnswer("l");

      const nextrand = Math.floor(Math.random() * 5) + 1;
      setArrayTrai(returnRandomNumberArray(firstRandom + nextrand, soPhepTinh));
      setArrayPhai(returnRandomNumberArray(firstRandom, soPhepTinh));
    } else if (newrand === "d") {
      setAnswer("d");
      setArrayTrai(returnRandomNumberArray(firstRandom, soPhepTinh));
      setArrayPhai(returnRandomNumberArray(firstRandom, soPhepTinh));
    } else if (newrand === "r") {
      setAnswer("r");
      const nextrand = Math.floor(Math.random() * 5) + 1;
      setArrayTrai(returnRandomNumberArray(firstRandom, soPhepTinh));
      setArrayPhai(returnRandomNumberArray(firstRandom + nextrand, soPhepTinh));
    } else {
      return null;
    }
  };

  const checkAnswers = (_answer) => {
    if (_answer === answer) {
      // neu dung
      setSignal(1);
      setCorrect(correct + 1);
    } else {
      //neu sai
      setSignal(0);
      setComboTimer(0);
      setComboPoint(1);
    }

    let r = Math.floor(Math.random() * 25) + 2;
    setFirstRandom(r);
    if (correct <= 15) {
      setSoPhepTinh(1);
    } else if (correct <= 25) {
      setSoPhepTinh(2);
    } else {
      setSoPhepTinh(3);
    }
    setTotalMath(totalMath + 1);
  };

  const handleLeftClick = () => {
    if (state !== states[1]) return;
    setButtonPressed("l");
    setTotalClick(totalClick + 1);
  };
  const handleDownClick = () => {
    if (state !== states[1]) return;
    setButtonPressed("d");
    setTotalClick(totalClick + 1);
  };
  const handleRightClick = () => {
    if (state !== states[1]) return;
    setButtonPressed("r");
    setTotalClick(totalClick + 1);
  };

  useEffect(() => {
    if (state === states[0]) return;

    timeRef.current = setInterval(() => {
      setTimer((preTimer) => preTimer - 1);
      if (timer <= 0) {
        setTimer(0);
        setState(states[2]);
        setShowTopScore(true);
        clearInterval(timeRef.current);
      }
    }, 1000);

    return () => clearInterval(timeRef.current);
  }, [state, timer]);

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

  //cookies data
  useEffect(() => {
    const hasCookie = checkCookies("MathGame");
    if (hasCookie) {
      setPointCookies(getCookies("MathGame"));
    } else {
      setPointCookies([]);
      setCookies("MathGame", []);
    }
  }, []);
  useEffect(() => {
    if (timer <= 0) {
      updateCookies("MathGame", point);
      setPointCookies(getCookies("MathGame"));
    }
  }, [point]);
  // end cookies data

  useEffect(() => {
    if (state === states[0] || state === states[2]) {
      return;
    }
    newNumber();
  }, [totalMath, state]);

  useEffect(() => {
    if (comboPoint >= maxcomboPoint) {
      setComboPoint(4);
    } else {
      setComboPoint(comboPoint + 1);
    }
    if (comboTimer >= maxcomboPoint) {
      setComboTimer(0);
      setTimer(timer + 5);
    } else {
      setComboTimer(comboTimer + 1);
    }
    setPoint((prev) => prev + correct * 10 * comboPoint);
  }, [correct]);

  useEffect(() => {
    if (buttonPress === "l") {
      checkAnswers("l");
    } else if (buttonPress === "d") {
      checkAnswers("d");
    } else if (buttonPress === "r") {
      checkAnswers("r");
    } else {
      return;
    }
  }, [totalClick]);

  useEffect(() => {
    if (state !== states[1]) return;
    const handleKeyUp = (event) => {
      if (event.key === "a") {
        setButtonPressed("l");
        setTotalClick(totalClick + 1);
      } else if (event.key === "s") {
        setButtonPressed("d");
        setTotalClick(totalClick + 1);
      } else if (event.key === "d") {
        setButtonPressed("r");
        setTotalClick(totalClick + 1);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [totalClick]);

  return (
    <>
      <NavbarFixed />
      {state === states[0] && (
        <div className="fixed w-full top-1/2 left-0 flex">
          <div className="w-lg mx-auto flex justify-between text-white text-center p-2">
            <button
              onClick={() => setState(states[1])}
              className={`flex justify-center items-center rounded-full w-28 h-12 border bg-_blue m-1 hover:box-shadow-framer`}
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
          </div>
        </div>
      )}
      <ShowTopScore
        score={point}
        data={pointCookies}
        visible={showTopScore}
        setVisible={setShowTopScore}
      />

      <div className="w-full h-screen px-2 py-8 bg-_dark">
        {state !== states[0] && (
          <div className="w-full h-full p-2 _response-grid">
            <div className="w-full h-full sm:h-auto flex flex-col justify-between max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex flex-nowrap justify-between p-4 border-b bg-slate-50">
                <h4 className="border rounded-full px-2 text-center text-xs font-medium bg-white">
                  {"Score: " + point}
                </h4>
                <h2 className="px-2 text-center text-sm font-bold bg-white">
                  {"Time: " + renderTimer()}
                </h2>
                <h4 className="border hidden rounded-full px-2 text-center text-xs font-medium bg-white">
                  {"Correct: " + correct + "/" + totalClick}
                </h4>
                <svg
                  onClick={() => setShowTopScore(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>

              <div className="w-full flex flex-wrap px-4 ">
                <div className="flex sm:w-1/2 h-auto sm:h-60 w-full items-center justify-center px-3 py-4 md:py-10">
                  <MathBoard mathArray={arrayTrai} randnum={firstRandom} />
                </div>
                <div className="flex sm:w-1/2 h-auto sm:h-60 w-full items-center justify-center px-3 py-4 md:py-10">
                  <MathBoard mathArray={arrayPhai} randnum={firstRandom} />
                </div>
              </div>

              <div className="w-full h-28 flex justify-center">
                <CheckAndXMark
                  signal={signal}
                  checkChange={totalClick}
                  visibleMark={visibleMark}
                  setVisibleMark={setVisibleMark}
                />
              </div>

              <div className="w-full">
                <div className="flex flex-nowrap justify-center flex-1">
                  <button
                    onClick={handleLeftClick}
                    className="w-1/3 h-28 bg-white p-1 border-t text-xs text-gray-800 font-semibold uppercase hover:bg-gray-100 transition-all duration-100"
                  >
                    Left Phase is Greater
                  </button>
                  <button
                    onClick={handleDownClick}
                    className="w-1/3 h-28 bg-white p-1 border text-xs text-gray-800 font-semibold uppercase hover:bg-gray-100 transition-all duration-100"
                  >
                    {"="}
                  </button>
                  <button
                    onClick={handleRightClick}
                    className="w-1/3 h-28 bg-white p-1 border-t text-xs text-gray-800 font-semibold uppercase hover:bg-gray-100 transition-all duration-100"
                  >
                    Right Phase is Greater
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MathGame;
