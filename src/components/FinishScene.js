import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createQuiz } from "../firebase/quizFirebase";
import GenderOption from "./subcomponents/GenderOption";
import CountryOption from "./subcomponents/CountryOption";
import EducationOption from "./subcomponents/EducationOption";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import AgeGroupOption from "./subcomponents/AgeGroupOption";

const FinishScene = ({
  changeScene,
  wrongQuizs,
  percentCorrect,
  time,
  setYourdata,
}) => {
  const { user } = useUserAuth();
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [age, setAge] = useState("");

  const [empties, setEmpties] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);

  const [smit, setSmit] = useState(false);

  console.log("finish : " + wrongQuizs);

  const checkEmptyFields = () => {
    let arr = [];

    if (gender === "") {
      arr.push("gender");
    } else {
      arr = arr.filter((item) => item !== "gender");
    }

    if (country === "") {
      arr.push("country");
    } else {
      arr = arr.filter((item) => item !== "country");
    }

    if (education === "") {
      arr.push("education");
    } else {
      arr = arr.filter((item) => item !== "education");
    }

    if (age === "") {
      arr.push("age");
    } else {
      arr = arr.filter((item) => item !== "age");
    }
    setEmpties(arr);
  };

  const onSubmit = () => {
    checkEmptyFields();
    setSmit(true);
  };

  useEffect(() => {
    checkEmptyFields();
  }, []);

  useEffect(() => {
    if (!smit) return;
    console.log(empties);

    if (empties.length <= 0) {
      let codesampple = {
        uid: user.uid,
        gender: gender,
        age: age,
        country: country,
        education: education,
        percentCorrect: percentCorrect,
        time: time,
        wrongs: [...wrongQuizs],
      };
      const sample_yourdata = {
        iq: undefined,
        edu: education,
        age: age,
      };
      setYourdata(sample_yourdata);
      if (time < 800) {
        createQuiz(codesampple).then(() => {
          changeScene("Calculator");
        });

        setIsDisabled(true);
        console.log(codesampple);
      } else {
        setIsDisabled(true);
        console.log(codesampple);
        changeScene("Calculator");
      }
    }
  }, [empties]);
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-600 body-font w-full h-screen bg-_darkblue"
      >
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="max-w-lg bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 shadow-lg">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Please select the options below to complete the test
            </h2>
            <div className="relative mb-4">
              <span className="leading-7 text-sm text-gray-600">Gender:</span>
              <GenderOption setGender={setGender} />
              {smit && gender === "" && (
                <span className="text-xs text-_red">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="leading-7 text-sm text-gray-600">Country:</span>
              <CountryOption setCountry={setCountry} />
              {smit && country === "" && (
                <span className="text-xs text-_red">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="leading-7 text-sm text-gray-600">
                Education:
              </span>
              <EducationOption setEducation={setEducation} />
              {smit && education === "" && (
                <span className="text-xs text-_red">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="leading-7 text-sm text-gray-600">Age:</span>
              <AgeGroupOption setAgeGroup={setAge} />
              {smit && age === "" && (
                <span className="text-xs text-_red">
                  * Please select an option
                </span>
              )}
            </div>
            <button
              disabled={isDisabled}
              onClick={onSubmit}
              className="text-white bg-_pink border-0 my-5 py-2 px-8 focus:outline-none  rounded text-lg disabled:bg-gray-400"
            >
              Submit
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default FinishScene;
