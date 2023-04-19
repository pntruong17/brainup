import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  returnTopTenNeuronsUsers,
  addNeuronAndIdTrivia,
  returnNeuronsAndAddNeuronAndIdTrivia,
} from "@/firebase/usersFirebase";
import {
  saveRecordTrivia,
  calculatePercentageIncrease,
} from "@/firebase/quizFirebase";

import { setCookies } from "@/components/cookie";

const newRecord = {
  uid: "0101",
  idTrivia: "trivia0010",
  neurons: 1541,
};

const newRecordTrivia = {
  id: "1111",
  name: "guess this famous singers",
  pointFirstPlayEveryUser: 1234,
};

const newRecordPercent = {
  id: "0101",
  pointFirstPlayEveryUser: 2700,
};

const Test = ({
  uid = "0101",
  idTrivia = "trivia0010",
  winstreak = 151,
  timeBonusStack = 252,
  correct = 541,
  state = "showingScore",
}) => {
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
    { title: "Creative Muse", points: 2000000 },
  ];
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [percent, setPercent] = useState([]);
  const [oldNeurons, setOldNeurons] = useState();
  const [newNeurons, setNewNeurons] = useState();
  const [levelPlayer, setLevelPlayer] = useState({
    title: "",
    nextTitle: "",
    percent: 0,
    xpNeeded: 0,
  });
  const [newLevelPlayer, setNewLevelPlayer] = useState({
    title: "",
    nextTitle: "",
    percent: 0,
    xpNeeded: 0,
  });

  const STATE = [];
  const radius = 65;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const offset1 = circumference - levelPlayer.percent * circumference;
  const offset2 = circumference - newLevelPlayer.percent * circumference;

  const calculateLevelPlayer = () => {
    const _oldIndex = CLASS.findIndex((item) => item.points > oldNeurons);
    const _newIndex = CLASS.findIndex((item) => item.points > newNeurons);

    if (_oldIndex >= 0) {
      const rangePoints = CLASS[_oldIndex].points - CLASS[_oldIndex - 1].points;
      const nextPoint = oldNeurons - CLASS[_oldIndex - 1].points;
      const percentage = nextPoint / rangePoints;

      setLevelPlayer({
        ...levelPlayer,
        title: CLASS[_oldIndex - 1].title,
        nextTitle: CLASS[_oldIndex].title,
        percent: percentage,
        xpNeeded: CLASS[_oldIndex].points - oldNeurons,
      });
    } else {
      setLevelPlayer({
        ...levelPlayer,
        title: "Creative Muse",
        nextTitle: "Creative Muse",
        percent: 1,
        xpNeeded: 0,
      });
    }
    if (_newIndex >= 0) {
      const rangePoints = CLASS[_newIndex].points - CLASS[_newIndex - 1].points;
      const nextPoint = oldNeurons - CLASS[_newIndex - 1].points;
      const percentage = nextPoint / rangePoints;

      setNewLevelPlayer({
        ...newLevelPlayer,
        title: CLASS[_newIndex - 1].title,
        nextTitle: CLASS[_newIndex].title,
        percent: percentage,
        xpNeeded: CLASS[_newIndex].points - oldNeurons,
      });
    } else {
      setNewLevelPlayer({
        ...newLevelPlayer,
        title: "Creative Muse",
        nextTitle: "Creative Muse",
        percent: 1,
        xpNeeded: 0,
      });
    }
  };

  const getTop = async () => {
    const _top = await returnTopTenNeuronsUsers();
    setTopTenUsers(_top);
  };

  const saveTrivia = async (newRecordTrivia) => {
    await saveRecordTrivia(newRecordTrivia);
  };

  const percentages = async (newRecordPercent) => {
    const pc = await calculatePercentageIncrease(newRecordPercent);
    setPercent(pc);
  };

  const returnNeuronsAndAddNeuronAndIdTriviaFunc = async (newRecord) => {
    const returnNeuron = await returnNeuronsAndAddNeuronAndIdTrivia(newRecord);
    setOldNeurons(returnNeuron.oldNeurons);
    setNewNeurons(returnNeuron.newNeurons);
  };

  useEffect(() => {
    if (state !== "showingScore") return;
    const newRecord = {
      uid: uid,
      idTrivia: idTrivia,
      neurons: winstreak + timeBonusStack + correct,
    };
    console.log(typeof idTrivia);
    setCookies("_Nerurons_Score_", idTrivia);
    // returnNeuronsAndAddNeuronAndIdTriviaFunc(newRecord).then(() =>
    //   calculateLevelPlayer()
    // );
  }, []);
  useEffect(() => {
    console.log(levelPlayer.percent);
  }, [levelPlayer]);
  return (
    <>
      <div className="w-full bg-[#16202C] py-8 md:py-12 font-Nunito overflow-hidden">
        <div className="max-w-[680px] min-h-screen shadow-sm mx-auto px-3">
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
                  {winstreak}
                </h3>
              </div>
              <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_accent bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                <h3 className="font-bold text-xl tracking-tight">
                  2. Timer Bonus{" "}
                </h3>
                <h3 className="font-bold text-xl tracking-tight">
                  {timeBonusStack}
                </h3>
              </div>
              <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_w_almost bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                <h3 className="font-bold text-xl tracking-tight">
                  3. Correct{" "}
                </h3>
                <h3 className="font-bold text-xl tracking-tight">{correct}</h3>
              </div>
              <div className="max-w-[280px] h-[68px] mx-auto mb-2 text-_red bg-white rounded-md shadow-lg flex justify-between items-center p-2 border-b-4">
                <h3 className="font-black text-2xl tracking-tight">
                  Neurons Point:{" "}
                </h3>
                <h3 className="font-black text-2xl tracking-tight">
                  +{winstreak + timeBonusStack + correct}
                </h3>
              </div>
              <h4 className="font-bold text-xl tracking-tight text-center pt-3">
                Your level: <span>{newLevelPlayer.title}</span>
                {levelPlayer.title !== newLevelPlayer.title && (
                  <>
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      {levelPlayer.title}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                    >
                      {newLevelPlayer.title}
                    </motion.span>
                  </>
                )}
              </h4>
              <div className="w-40 h-40 mx-auto">
                {newLevelPlayer.percent !== undefined && (
                  <svg transform="rotate(-90)" width={200} height={200}>
                    <circle
                      cx={123}
                      cy={80}
                      r={50}
                      fill="none"
                      stroke="#ccc"
                      strokeWidth={10}
                      strokeDasharray={314}
                      strokeDashoffset={0}
                    />
                    <circle
                      cx={123}
                      cy={80}
                      r={50}
                      fill="none"
                      stroke="#0f0"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={
                        circumference -
                        ((newLevelPlayer.percent * 2.3) / 3) * circumference
                      }
                    />
                  </svg>
                )}
              </div>
              <h4
                onClick={() => setTrigger(!trigger)}
                className="font-semibold text-base tracking-tight text-center p-2"
              >
                {levelPlayer.title === CLASS[10].title
                  ? "You reached max level!!!"
                  : `${newLevelPlayer.xpNeeded} Neurons needed to reach next level - ${newLevelPlayer.nextTitle}`}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
