import Image from "next/image";
import React from "react";
import Link from "next/link";

const CardKidsGame = ({ game }) => {
  return (
    <>
      <div className="w-full sm:w-1/2">
        <div className="w-full rounded-3xl overflow-hidden p-1 xs:p-3">
          <div className="w-full min-h-[180px] relative rounded-3xl overflow-hidden my-2">
            <Image
              src={
                game?.image ||
                "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg"
              }
              fill
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="w-full flex flex-col justify-between items-center">
            <div w-full>
              <h3 className="text-center text-lg font-black tracking-tighter">
                {game?.name || "This is game for kid"}
              </h3>
            </div>
            <div w-full>
              <Link
                href={"/kid-games/" + game.slug}
                className="mx-auto py-1 px-3 text-center text-xl font-black bg-white rounded-full border-b-4 border-green-200 hover:border-b-2 duration-100"
              >
                Get it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardKidsGame;
