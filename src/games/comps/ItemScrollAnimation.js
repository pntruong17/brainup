import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ItemScrollAnimation = ({ id, item, setValue, visible, setVisible }) => {
  const handleClick = (_id) => {
    setValue(_id);
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {visible && (
          <motion.div
            onClick={() => handleClick(id)}
            className="w-1/5 h-[50px] xs:h-[60px] flex items-center justify-center text-5xl md:text-6xl cursor-pointer border"
            key={visible}
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "tween",
              stiffness: 260,
              damping: 20,
              duration: 0.25,
            }}
          >
            <div className="xxs:text-4xl xs:text-5xl md:text-6xl cursor-pointer text-center">
              {item}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ItemScrollAnimation;
