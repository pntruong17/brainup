import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PregameModal = ({
  nameGame,
  Howplayed,
  photoURL,
  visibleModal,
  setVisibleModal,
}) => {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {visibleModal && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed w-screen h-screen flex justify-center items-center bg-_darkblue z-20`}
          >
            <div className="w-1/2 flex flex-col items-center">
              <img className="w-24 mb-6 " src={photoURL} alt={nameGame} />
              <h3 className="font-bold text-xl my-1 tracking-tighter text-_red">
                {nameGame}
              </h3>
              <p className="text-xs md:text-base text-white my-1 leading-tight tracking-tighter text-center">
                {Howplayed}
              </p>
              <button
                className="text-sm font-bold text-white bg-black rounded-full px-8 py-2 mt-5"
                onClick={() => setVisibleModal(false)}
              >
                Already!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PregameModal;
