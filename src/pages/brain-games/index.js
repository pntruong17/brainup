import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import React from "react";
import GameCard from "@/games/comps/GameCard";
import { gamelib } from "@/libs/gamelib";

const BrainGames = () => {
  return (
    <Layout
      pageMeta={{
        title: "Brain Games | Brain Up",
        description:
          "Game Designed to train your brain, discover the various cognitive games and exercises",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full h-[250px] flex flex-col items-center justify-center pt-24 md:pt-44">
          <h1 className="text-3xl md:text-5xl font-Inter font-bold tracking-tight text-center">
            Game Designed to <br /> train your brain
          </h1>
          <h4 className="text-lg md:text-2xl font-Inter font-medium tracking-tighter text-center py-2">
            Discover the various cognitive games and exercises
          </h4>
        </div>
        <div className="max-w-[56rem] mx-auto mt-10 grid sm:grid-cols-2 md:grid-cols-3">
          {gamelib.map((game) => {
            return (
              <div key={game.id} className="">
                <GameCard
                  gameName={game.Name}
                  gameDesc={game.Desc}
                  gamePhoto={game.PhotoURL}
                  gameSlug={game.Slug}
                  gameColorBG={game.ColorBG}
                />
              </div>
            );
          })}
        </div>
      </motion.section>
    </Layout>
  );
};

export default BrainGames;
