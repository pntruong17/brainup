import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { returnIQTestRemain } from "@/firebase/usersFirebase";
import { useUserAuth } from "./helper/UserAuthContextProvider";

import ButtonWrapper from "../components/paypal/ButtonWrapper";

const currency = "USD";

const PrepareScene = ({ changeScene, setMyUser, numtest, setNumtest }) => {
  const { user } = useUserAuth();
  const navigate = useRouter();

  const [state, setState] = useState("start");
  const [_uid, _setUid] = useState(null);

  const clickPlay = () => {
    console.log("Doing Test");
    changeScene("Doing Test");
  };

  useEffect(() => {
    if (user) {
      _setUid(user.uid);
      setMyUser(user);
    } else {
      navigate.push("/");
    }
  }, [_uid, user]);

  useEffect(() => {
    if (_uid === null) return;
    const testNumber = async () => {
      const testNumber = await returnIQTestRemain(_uid);
      setNumtest(testNumber);
      console.log("testNumber: " + testNumber);
      if (testNumber > 0) {
        setState("test");
        console.log("Co The Test IQ!");
      } else {
        //setState("purchase");
        setState("test");
        console.log("Khong The Test - Hay Mua 1 luot Test!");
      }
    };
    testNumber();
    console.log(_uid);
  }, [_uid]);

  const toggleCanTest = () => {
    console.log("free test");
  };
  useEffect(() => {
    console.log(_uid);
  }, [_uid, user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-_darkblue"
    >
      <div className="h-screen max-w-md px-2 py-16 mx-auto">
        <div className="flex flex-col rounded-lg shadow-xl bg-white p-10">
          <h3 className="text-center font-bold text-2xl mb-4 text-gray-800 tracking-tight uppercase">
            Take a Profesional
            <br />
            IQ test?
          </h3>
          <div className="font-Inter text-sm mb-3">
            <p className="flex items-center text-gray-600 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-purple text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              There are 30 questions
            </p>

            <p className="flex items-center text-gray-600 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-purple text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              The result will be: exactly your IQ
            </p>

            <p className="flex items-center text-gray-600 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-purple text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              Help you know your IQ Score
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-purple text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              Analysis of your intelligence types
            </p>
          </div>
          <h5 className="text-center font-semibold text-gray-800 mb-2">
            {state === "start" && "loading"}
            {state === "test" && "ARE YOUR READY?"}
            {state === "purchase" &&
              "Purchase a profectional IQ testing with Paypal"}
          </h5>

          {state === "purchase" && (
            <ButtonWrapper
              currency={currency}
              showSpinner={false}
              numtest={numtest}
            />
          )}
          {state === "test" && (
            <button
              onClick={clickPlay}
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <svg
                  className="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeWnejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                You Can Test IQ Now
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PrepareScene;
