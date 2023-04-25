import NavbarFixed from "@/components/NavbarFixed";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import RenderStars from "./comps/RenderStars";

const StarSearch = () => {
  const states = ["start", "playing", "close"];
  const [timer, setTimer] = useState(90);
  const delayVisible = useRef();
  const [ins, setIns] = useState(0);
  const [state, setState] = useState("start");
  const [visible, setVisible] = useState(true);

  const [id, setID] = useState(0);
  const [totalrow, setTotalrow] = useState(20);

  const [point, setPoint] = useState(1);
  const [stars, setStars] = useState([]);
  const [wrongclick, setWrongclick] = useState(3);

  const randomStates = (n) => {
    const _diamondStyles = [1, 2, 3, 4];
    const rotations = [0, -2, 2, -1, 1];
    const degs = [0, 15, 30, 45, 60];
    const newArray = [];

    for (let i = 0; i < n; i++) {
      let groupA, groupB, groupC;
      let found = false;

      while (!found) {
        const randARotateIndex = Math.floor(Math.random() * rotations.length);
        const randADegIndex = Math.floor(Math.random() * degs.length);
        const randStyleIndex = Math.floor(
          Math.random() * _diamondStyles.length
        );

        groupA = rotations[randARotateIndex];
        groupB = degs[randADegIndex];
        groupC = _diamondStyles[randStyleIndex];

        let duplicate = false;
        for (let j = 0; j < newArray.length; j++) {
          if (
            newArray[j].rotate === groupA &&
            newArray[j].deg === groupB &&
            newArray[j].icon === groupC
          ) {
            duplicate = true;
            break;
          }
        }

        if (!duplicate) {
          found = true;
        }
      }

      newArray.push({
        id: i,
        rotate: groupA,
        deg: groupB,
        icon: groupC,

        type: "hero",
      });
    }
    return newArray;
  };

  const initGroupStars = (n) => {
    let _stars = [];
    let _n = n;
    while (_n > 2) {
      const rand = Math.floor(Math.random() * 2) + 2;
      _stars.push(rand);
      _n -= rand;
    }
    if (_n > 1) _stars.push(_n);
    return _stars;
  };

  const createStars = () => {
    let starArray = [];
    let s = 3 + Math.floor(point / 2.5); //5
    let st = 3 + Math.floor(point / 4.5); //9
    if (s >= 20) s = 20;
    if (st >= 14) st = 14;
    const state = randomStates(st); //st
    const star = initGroupStars(s); //s
    for (let i = 0; i < star.length; i++) {
      for (let j = 0; j < star[i]; j++) {
        starArray.push(state[i + 1]);
      }
    }
    starArray.push(state[0]);
    return starArray;
  };

  const addFullPlace = () => {
    const hero = createStars();
    let tem = hero;
    for (let i = hero.length; i < totalrow; i++) {
      tem.push({
        id: i,
        rotate: null,
        deg: null,
        icon: null,

        type: "blank",
      });
    }
    tem.sort(() => Math.random() - 0.5);
    return tem;
  };

  /// USeEffect

  useEffect(() => {
    if (state === states[0] || state === states[2]) return;
    if (wrongclick <= 1) {
      setState(states[2]);
    }
    if (id === 0) {
      setStars([]);
      setStars(addFullPlace());
      setPoint(point + 1);
    } else {
      setWrongclick(wrongclick - 1);
    }

    delayVisible.current = setTimeout(() => {
      setVisible(true);
    }, 250);
    return () => clearTimeout(delayVisible.current);
  }, [ins, state]);

  //timer
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

  useEffect(() => {
    if (state === states[0] || state === states[2]) return;
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
      if (timer <= 0) {
        setTimer(0);
        setState(states[2]);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state, timer]);

  return (
    <>
      <NavbarFixed />
      {state === states[1] && (
        <div className="fixed w-full top-0 left-0 flex">
          <div className="w-lg mx-auto flex justify-between  text-center p-2">
            <h4>Time: {renderTimer()}</h4>
          </div>
        </div>
      )}
      {state === states[0] && (
        <div className="fixed w-full top-1/2 left-0 flex">
          <div className="w-lg mx-auto flex justify-between  text-center p-2">
            <button onClick={() => setState(states[1])} className="btn">
              Play !
            </button>
          </div>
        </div>
      )}
      {state === states[2] && (
        <div className="fixed w-full top-1/2 left-0 flex">
          <div className="w-lg mx-auto flex flex-col  text-center p-2 border -m-10">
            <h4 className="text-2xl font-bold text-center underline">
              Game Close
            </h4>
            <h4 className="text-xl font-bold text-center">
              You have picked up{" "}
              <span className="text-3xl text-_accent">{point}</span> diamonds
            </h4>
          </div>
        </div>
      )}
      {state === states[1] && (
        <div className="fixed w-full bottom-0 left-0 flex">
          <div className="w-lg mx-auto flex justify-between  text-center p-2">
            <h4>Level: {point}</h4>
            <h4 className="ml-10">!ncorrect: {wrongclick}</h4>
          </div>
        </div>
      )}
      <div className="w-full flex items-center h-screen p-5">
        <div className="max-w-xl md:max-w-2xl max-h-full rounded-md mx-auto">
          <div className="grid grid-cols-4  w-full max-h-full">
            <AnimatePresence>
              {state === states[1] &&
                stars.map((star, index) => {
                  return (
                    <RenderStars
                      key={index}
                      star={star}
                      setID={setID}
                      setIns={setIns}
                      visible={visible}
                      setVisible={setVisible}
                    />
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default StarSearch;
