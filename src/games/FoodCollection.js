import NavbarFixed from "@/components/NavbarFixed";
import React, { useState, useEffect, useRef } from "react";
import ItemScrollAnimation from "./comps/ItemScrollAnimation";
import ScoreBoard from "@/components/subcomponents/ScoreBoard";
import { useRouter } from "next/router";
import { checkCookies, setCookies, getCookies } from "@/components/cookie";

// loi-> xuat hien hinh bi trung

const FoodCollection = () => {
  const router = useRouter();
  const delayVisibleRef = useRef();
  const states = ["start", "playing", "close"];
  const [state, setState] = useState(states[0]);

  const [win, setWin] = useState(false);
  const [show, setShow] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(true);
  const [pointCookies, setPointCookies] = useState();
  const [visible, setVisible] = useState(true);

  const [features, setFeatures] = useState(
    [
      { icon: "🥩", id: 0 },
      { icon: "🍇", id: 1 },
      { icon: "🍈", id: 2 },
      { icon: "🍉", id: 3 },
      { icon: "🍊", id: 4 },
      { icon: "🍋", id: 5 },
      { icon: "🍌", id: 6 },
      { icon: "🍍", id: 7 },
      { icon: "🥭", id: 8 },
      { icon: "🍎", id: 9 },
      { icon: "🍏", id: 10 },
      { icon: "🍐", id: 11 },
      { icon: "🍑", id: 12 },
      { icon: "🍒", id: 13 },
      { icon: "🍓", id: 14 },
      { icon: "🥝", id: 15 },
      { icon: "🍅", id: 16 },
      { icon: "🥥", id: 17 },
      { icon: "🥑", id: 18 },
      { icon: "🍆", id: 19 },
      { icon: "🥔", id: 20 },
      { icon: "🥕", id: 21 },
      { icon: "🌽", id: 22 },
      { icon: "🌶️", id: 23 },
      { icon: "🥒", id: 24 },
      { icon: "🥬", id: 25 },
      { icon: "🥦", id: 26 },
      { icon: "🧄", id: 27 },
      { icon: "🧅", id: 28 },
      { icon: "🍄", id: 29 },
      { icon: "🥜", id: 30 },
      { icon: "🍟", id: 31 },
      { icon: "🍕", id: 32 },
      { icon: "🌭", id: 33 },
      { icon: "🍣", id: 34 },
    ].sort(() => Math.random() - 0.5)
  );

  const [featureSlots, setFeatureSlots] = useState([]);

  const returnSelectedInDiv = () => {
    const iconDivs = selected.map((select, i) => (
      <div className="text-3xl" key={i}>
        {select.icon}
      </div>
    ));

    return iconDivs;
  };

  const [selected, setSelected] = useState([]);

  const [ins, setIns] = useState(2);

  const handleStart = () => {
    setState(states[1]);
    setFeatureSlots(
      new Array(features.length)
        .fill("empty")
        .map((_, i) => (i < 2 ? features[i] : " "))
      //.sort(() => Math.random() - 0.5)
    );
  };
  const handleRestart = () => {
    setState(states[1]);
    setIns(2);
    setSelected([]);
    setFeatureSlots(
      new Array(features.length)
        .fill("empty")
        .map((_, i) => (i < 2 ? features[i] : " "))
      //.sort(() => Math.random() - 0.5)
    );
  };
  const tinhDiem = () => {
    const _point = 2000;
    const numCookies = getCookies("_USER_COOKIES_TRIVIA_LVL");
    const newPoint = Number(numCookies) + Number(_point);
    setCookies("_USER_COOKIES_TRIVIA_LVL", newPoint);
    setPointCookies(newPoint);
  };

  const handleWinGame = () => {
    tinhDiem();
    setState(states[2]);
    setWin(true);
  };

  useEffect(() => {
    let timeDelayRef = null;
    if (state === states[2]) {
      timeDelayRef = setTimeout(() => {
        setShow(true);
        clearTimeout(timeDelayRef);
      }, 2500);
    }
    return () => clearTimeout(timeDelayRef);
  }, [state]);

  useEffect(() => {
    if (state === states[0]) {
      return;
    }
    //setValue(true);
    const updateFeatures = () => {
      if (selected.length === features.length) {
        handleWinGame();
        return;
      }

      const index = featureSlots.findIndex((feature) => feature === " ");
      if (index !== -1) {
        const newFeaSlot = [...featureSlots];
        newFeaSlot[index] = features[ins];
        newFeaSlot.sort(() => Math.random() - 0.5);
        setFeatureSlots(newFeaSlot);
      } else {
        const newFeaSlot = [...featureSlots];
        newFeaSlot.sort(() => Math.random() - 0.5);
        setFeatureSlots(newFeaSlot);
      }
    };
    updateFeatures();
  }, [ins, state]);

  useEffect(() => {
    delayVisibleRef.current = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => {
      clearTimeout(delayVisibleRef.current);
    };
  }, [featureSlots]);

  useEffect(() => {
    if (!showScoreBoard) {
      router.push("/brain-games");
    }
  }, [showScoreBoard]);

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

  const setValue = (_value) => {
    const isInfeaSlot = featureSlots.some((v) => v.id === _value);
    const isInSelected = selected.some((v) => v.id === _value) || false;

    const newIcon = featureSlots.find((v) => v.id === _value);

    if (isInfeaSlot && !isInSelected && _value !== " ") {
      setSelected([...selected, newIcon]);
      setIns((prev) => prev + 1);
      setWin(true);
    } else {
      const _tempfeature = [...features];
      _tempfeature.sort(() => Math.random() - 0.5);
      setFeatures(_tempfeature);
      setWin(false);
      setSelected([...selected, newIcon]);
      setState(states[2]);
    }
  };

  return (
    <>
      <NavbarFixed />
      {show ? (
        <div className="absolute z-10 top-0 left-0 w-full h-screen bg-_bg_dark py-16">
          <ScoreBoard
            closeButton={true}
            correct={2000}
            pointCookies={pointCookies}
            setShowScoreBoard={setShowScoreBoard}
          />
        </div>
      ) : null}
      <div className="flex w-full min-h-screen justify-center items-center px-3 py-10">
        {state === states[1] && (
          <div className="rounded-2xl bg-_secondary_dark p-5 -m-2">
            <div className="w-full flex justify-between">
              <h4 className="text-xs border rounded-full px-3 py-1 text-center">
                Collected: {selected.length} / 35
              </h4>
            </div>

            <div className="w-[200px] h-[400px] xs:w-[300px] xs:h-[500px] md:w-[400px] md:h-[600px]">
              <div className="flex flex-wrap">
                {featureSlots.map((slot, index) => {
                  return (
                    <ItemScrollAnimation
                      key={index}
                      id={slot.id}
                      visible={visible}
                      setVisible={setVisible}
                      item={slot.icon}
                      setValue={setValue}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {state === states[0] && (
          <div className="w-full flex h-28 justify-center">
            <button
              onClick={handleStart}
              className={`flex justify-center items-center rounded-full w-28 h-12 bg-green-400 m-1 hover:box-shadow-framer`}
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
        )}

        {state === states[2] && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
            <h3 className="text-xl text-center text-_red font-bold">
              {win ? "You are win! " : "You chose incorrectly"}
            </h3>
            <h3 className="text-center text-sm text-white my-1">
              Your choices are:
            </h3>

            <div className="flex flex-wrap justify-center w-full">
              {returnSelectedInDiv()}
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={handleRestart}
                className={`${
                  state === states[2] ? "" : "hidden"
                } flex justify-center items-center rounded-full w-28 h-10 bg-_blue  m-1 hover:box-shadow-framer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodCollection;
