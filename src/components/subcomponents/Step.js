import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Step = (props) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const timeRef = useRef();
  const { steps, setStart, delay } = props;

  const handleNext = () => {
    if (step >= steps.length - 1) return;
    setStep(step + 1);
  };
  const handlePrev = () => {
    if (step <= 0) return;
    setStep(step - 1);
  };
  useEffect(() => {
    const timeRef = setTimeout(() => {
      setOpen(true);
    }, delay);

    return () => {
      clearTimeout(timeRef);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed w-full h-screen bg-gray-800/[0.95] flex justify-center items-center z-30"
          >
            <div className="max-w-[400px] h-[210px] bg-white rounded-md shadow-md mx-4 p-8 flex flex-col justify-between">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-base font-medium text-_dark"
              >
                {steps[step]}
              </motion.div>
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  className="bg-gray-200 text-gray-500 text-sm font-medium rounded-full py-2 px-6 hover:bg-gray-300 transition-all duration-150"
                >
                  Back
                </button>
                {step === steps.length - 1 && (
                  <button
                    onClick={() => {
                      setStart();
                      setOpen(false);
                    }}
                    className="bg-blue-500 text-white text-sm font-medium rounded-full py-2 px-6 hover:bg-blue-600 transition-all duration-150"
                  >
                    Let&apos;s go
                  </button>
                )}
                {step < steps.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white text-sm font-medium rounded-full py-2 px-6 hover:bg-blue-600 transition-all duration-150"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Step;
