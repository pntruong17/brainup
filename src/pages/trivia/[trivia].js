import React, { useEffect, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import AnswerButton from "@/trivia/AnswerButton";

const Trivia = ({ triviBySlug }) => {
  const STATES = ["start", "timego", "timeout", "answered", "cloded"];
  const TIMER = 8000;
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [questionLeft, setQuestionLeft] = useState(
    triviBySlug.questions.length
  );
  const [trivia, setTrivia] = useState(triviBySlug);
  const [thisQuestion, setThisQuestion] = useState(undefined);
  const [state, setState] = useState("start");
  const [correct, setCorrect] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const timeRef = useRef();

  const checkAnswer = (userAnswer) => {
    if (state === "timeout" || state === "answered") return;

    if (userAnswer) {
      setCorrect(correct + 1);
    }
    setQuestionLeft(questionLeft - 1);
    setShowCorrect(true);
    clearTimeout(timeRef.current);
    setState(STATES[3]);
  };
  const handleNext = () => {
    setShowCorrect(false);
    setCurrentQuiz(currentQuiz + 1);
    setState(STATES[1]);
  };
  useEffect(() => {
    console.log(currentQuiz);
    if (currentQuiz >= triviBySlug.questions.length) {
      setState(STATES[4]);
      console.log("show results");
    }
  }, [currentQuiz]);
  useEffect(() => {
    if (state === STATES[4]) {
      console.log("result page");
    }
  }, [state]);
  useEffect(() => {
    if (state !== STATES[1]) return;
    timeRef.current = setTimeout(() => {
      setState(STATES[2]);
      console.log("timeout");
    }, TIMER);
    return () => clearTimeout(timeRef.current);
  }, [state]);

  useEffect(() => {
    const quiz = trivia.questions[currentQuiz];
    console.log(quiz);
    setThisQuestion(quiz);
  }, [thisQuestion, currentQuiz]);
  return (
    <>
      <Layout
        pageMeta={{
          title: triviBySlug.title,
          discription: triviBySlug.expert,
        }}
      >
        <div className="w-full pt-20 md:pt-32 font-Nunito">
          <div className="max-w-[680px] shadow-sm mx-auto px-3">
            <div className="w-full h-[600px] rounded-xl border overflow-hidden flex flex-col justify-between relative">
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
                        {questionLeft}
                      </h2>
                    </div>
                    <h3 className="text-xs font-bold text-white text-center">
                      Question
                      <br />
                      left
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
                    <motion.h3
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      key={""}
                      className="absolute top-[-20px] right-0 font-bold text-_w_almost"
                    >
                      +12
                    </motion.h3>
                  </div>
                </div>
              </div>
              <div className="w-full h-[300px] p-5 overflow-hidden flex justify-center">
                <img
                  src={`${triviBySlug.image}`}
                  className="object-contain object-center h-full"
                  alt=""
                />
              </div>
              <div className="w-full h-[300px] px-3 pb-3 flex flex-col justify-between">
                <div className="flex flex-wrap">
                  {thisQuestion &&
                    thisQuestion.answers.map((answer, i) => (
                      <AnswerButton
                        key={i}
                        currentQuiz={currentQuiz}
                        showCorrect={showCorrect}
                        answers={answer}
                        checkAnswer={checkAnswer}
                      />
                    ))}
                </div>
                <div className="flex justify-between">
                  <h3 className="p-1 text-xl">Note</h3>
                  <h3
                    onClick={handleNext}
                    className={`p-1 font-bold text-xl sm:text-2xl hover:underline cursor-pointer ${
                      state === "timeout" || state === "answered"
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    {currentQuiz === triviBySlug.questions.length - 1
                      ? "Show Result"
                      : "Next Question"}
                  </h3>
                </div>
                <div className="border rounded-lg">
                  <p className="p-1">Fact: {triviBySlug.fact}</p>
                </div>
              </div>
              {state === STATES[0] && (
                <div className="absolute top-0 left-0 w-full h-full bg-slate-300 flex flex-col items-center justify-center border">
                  <h2 className="text-4xl tracking-tight font-bold mb-10 text-center p-3">
                    {triviBySlug.title}
                  </h2>
                  <h2
                    onClick={() => setState(STATES[1])}
                    className="text-3xl tracking-tight font-bold p-5 border-b-4 border-_accent rounded-lg bg-_accent/[0.8] hover:bg-_accent/[0.9] text-_darkblue cursor-pointer duration-200"
                  >
                    Start The Quiz
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
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
  return {
    props: {
      triviBySlug: triviBySlug[0],
    },
  };
};
export default Trivia;
