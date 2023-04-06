import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import FinishScene from "@/components/FinishScene";
import PrepareScene from "@/components/PrepareScene";
import QuizScene from "@/components/QuizScene";
import { useUserAuth } from "@/components/helper/UserAuthContextProvider";
import Calculator from "@/components/Calculator";

// const sample_yourdata = {
//   iq: 113,
//   edu: "Bachelor's degree",
//   age: "60 - 79",
// };
export const IQcontext = createContext();

const Testiq = () => {
  const navigate = useRouter();
  const { user } = useUserAuth();
  const [gamestate, setGamestate] = useState("Prepare");
  const [result, setResult] = useState([]);
  const [myUser, setMyUser] = useState();
  const [numtest, setNumtest] = useState();
  const [yourdata, setYourdata] = useState();

  useEffect(() => {
    if (user === null) {
      navigate.push("/login");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    //setFinish(true);
  }, [result, yourdata]);

  const changeScene = (name) => {
    setGamestate(name);
  };

  return (
    <>
      <IQcontext.Provider
        value={{ yourdata, setYourdata, user, result, setResult }}
      >
        <div>
          {gamestate === "Prepare" && user !== null && (
            <PrepareScene
              changeScene={changeScene}
              setMyUser={setMyUser}
              numtest={numtest}
              setNumtest={setNumtest}
            />
          )}
          {gamestate === "Doing Test" && user !== null && (
            <QuizScene changeScene={changeScene} setResult={setResult} />
          )}
          {gamestate === "Finish" && user !== null && (
            <FinishScene
              changeScene={changeScene}
              wrongQuizs={result.wrongQuizs}
              percentCorrect={result.percentCorrect}
              time={result.time}
              setYourdata={setYourdata}
            />
          )}
          {gamestate === "Calculator" && user !== null && (
            <Calculator
              percentCorrect={result.percentCorrect}
              myUser={myUser}
              numtest={numtest}
              wrongQuizs={result.wrongQuizs}
              time={result.time}
              yourdata={yourdata}
              setYourdata={setYourdata}
            />
          )}
        </div>
      </IQcontext.Provider>
    </>
  );
};

export default Testiq;
