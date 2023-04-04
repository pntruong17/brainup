import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// score: la diem choi game hien tai cua nguoi choi
// data: la 1 array luu nhung so diem da choi
const ShowTopScore = ({ score, data, visible, setVisible }) => {
  const [_data, _setData] = useState();
  const handleClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    let copyArr = [...data];
    let newArr = Array.from(new Set(copyArr));
    let lastIndex = data[data.length - 1];
    newArr.sort(function (a, b) {
      return b - a;
    });
    if (newArr.length > 3) {
      newArr.splice(3);
    }

    _setData(newArr);
    console.log(lastIndex);
  }, [data]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-screen bg-_dark/[.98] z-10"
          >
            <div onClick={handleClose} className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="white"
                className="w-10 h-10 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="w-full h-full flex">
              <div className="w-72 h-96 m-auto rounded-md bg-white">
                <div className="mb-10">
                  <h3 className="font-black text-xl text-_accent text-center mt-5">
                    Your score is:
                  </h3>
                  <h3 className="text-3xl text-center text-_dark font-black p-4 border-b">
                    {score}
                  </h3>
                </div>
                <h3 className="font-black text-xl text-_accent text-center mt-5 uppercase">
                  Top Scores
                </h3>
                <ul>
                  {_data &&
                    _data.map((d, i) => {
                      return (
                        <li
                          className={`text-center text-_darkblue text-2xl font-black mt-5 border-l-8 border-_orange`}
                          key={i}
                        >
                          {"Top " + (i + 1) + ": " + d}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShowTopScore;
