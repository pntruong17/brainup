import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useReducer, useRef, useState } from "react";
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import confetti from "/public/animation/confetti";
import { kidgamelib } from "@/libs/kidgamelib";

const Game = ({ game }) => {
  //console
  useEffect(() => {
    //console.log("current question", gameState.currentQuestion);
    //console.log("thisquestion", thisQuestion);
    //console.log("point", gameState.point);
  }, []);
  return (
    <>
      <div className="w-full h-screen font-Nunito text-_darkblue p-0 sm:p-3 bg-emerald-400">
        <div className="max-w-md md:max-w-5xl h-full mx-auto bg-orange-50 rounded-none sm:rounded-[50px] overflow-hidden border sm:border-8">
          {kidgamelib[game.index].Game}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const gameSlugs = kidgamelib.map((game) => ({
    params: { game: game.slug },
  }));
  return {
    paths: gameSlugs,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slugGames = params.game;
  const indexGame = kidgamelib.findIndex((game) => game.slug === slugGames);
  return {
    props: {
      game: { slug: slugGames, index: indexGame },
    },
  };
};

export default Game;
