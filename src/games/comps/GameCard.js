import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const GameCard = ({ gameName, gameDesc, gamePhoto, gameSlug, gameColorBG }) => {
  const router = useRouter();
  return (
    <>
      <div className="m-3 border rounded-2xl h-80 overflow-hidden hover:shadow-md cursor-pointer">
        <div
          className={`flex w-full h-32 justify-center items-center ${gameColorBG} `}
        >
          <img
            className="object-scale-down object-center w-1/4 h-24"
            src={gamePhoto}
            alt={gameName}
          />
        </div>
        <div className="flex flex-col h-44 justify-between text-center p-2">
          <h3 className="text-gray-800 font-bold text-2xl tracking-tighter">
            {gameName}
          </h3>
          <p className="text-gray-500 text-sm tracking-tighter ">{gameDesc}</p>
          <Link
            href={"/brain-games/" + gameSlug}
            className="font-semibold text-gray-600 text-md border border-gray-300 p-3 rounded-full hover:border-gray-400"
          >
            Play
          </Link>
        </div>
      </div>
    </>
  );
};
/** https://cms-assets.tutsplus.com/cdn-cgi/image/width=800/uploads/users/2361/posts/36065/image/what_is_illustration_example_illustrator.jpg **/
export default GameCard;
