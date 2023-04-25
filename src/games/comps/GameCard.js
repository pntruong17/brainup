import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const GameCard = ({ gameName, gameDesc, gamePhoto, gameSlug, gameColorBG }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col m-3 border dark:border-none dark:bg-_darkblue rounded-2xl min-h-[320px] overflow-hidden hover:shadow-md cursor-pointer">
        <div
          className={`flex w-full h-28 justify-center items-center ${gameColorBG}`}
        >
          <Image
            width={80}
            height={80}
            objectFit="contain"
            className="object-scale-down object-center w-1/4 h-24"
            src={gamePhoto}
            alt={gameName}
          />
        </div>
        <div className="flex-grow flex flex-col h-auto justify-between text-center p-2">
          <h3 className=" font-bold text-2xl tracking-tighter">{gameName}</h3>
          <p className=" text-sm tracking-tighter ">{gameDesc}</p>
          <Link
            href={"/brain-games/" + gameSlug}
            className="font-semibold text-md border border-gray-300 p-3 rounded-full hover:border-gray-400 my-3"
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
