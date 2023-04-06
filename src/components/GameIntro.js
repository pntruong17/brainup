import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gamelib } from "@/libs/gamelib";

const GameFeatureIntro = () => {
  // test getDocument
  const [width, setWidth] = useState(0);
  const casousel = useRef();

  useEffect(() => {
    setWidth(casousel.current.scrollWidth - casousel.current.offsetWidth);
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font bg-_dark">
        <div className="container mx-auto flex px-5 py-16 mt-16 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="text-5xl font-bold mb-4 text-white tracking-tighter leading-tight">
              Brain games help <br />
              enhance <span className="text-cyan-400">
                {" "}
                brain activity
              </span>{" "}
            </h1>
            <p className="text-gray-300 mb-8 leading-relaxed font-albert">
              Brain games can{" "}
              <span className="font-bold text-md text-white">
                {" "}
                improve brain activity by stimulating cognitive functions such
                as memory, attention, and problem-solving.
              </span>{" "}
              These challenges require the brain to process information, leading
              to increased neural connectivity and cognitive function.
            </p>
            <motion.div
              ref={casousel}
              whileTap={"grabbing"}
              className="w-full h-44 mb-14 cursor-grab overflow-hidden"
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex"
              >
                {gamelib.map((game, i) => {
                  return (
                    <motion.div
                      key={i}
                      className="min-w-[5rem] min-h-[5rem] m-2 rounded-2xl bg-white"
                    >
                      <img
                        className="object-scale-down object-center"
                        src={game.PhotoURL}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
            <div className="flex justify-center">
              <Link href={"/brain-games"} className="btn-learnmore">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameFeatureIntro;
