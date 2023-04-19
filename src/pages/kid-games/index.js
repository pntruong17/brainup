import CardKidsGame from "@/kidgames/CardKidsGame";
import Image from "next/image";
import React from "react";

const Index = ({ user, game }) => {
  return (
    <>
      <div className="w-full min-h-screen font-Nunito text-_darkblue p-3 bg-emerald-400">
        <div className="max-w-md min-h-[850px] mx-auto bg-orange-50 rounded-[50px] overflow-hidden px-3 xs:px-5 py-4">
          <div className="flex justify-start items-center">
            <div className="w-10 h-10 relative">
              <Image
                src={
                  user?.avatar ??
                  "https://img.freepik.com/premium-vector/laughing-boy-avatar-funny-kid-profile-picture_176411-3537.jpg"
                }
                fill
                layout="cover"
              />
            </div>
            <h3 className="font-bold text-base">Hello, Kitty!</h3>
          </div>
          <div className="relative w-full min-h-[350px] rounded-3xl overflow-hidden mt-10">
            <Image
              src={
                game?.image ??
                "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg"
              }
              fill
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute w-full h-full p-3 xs:p-10 flex flex-col justify-between items-center">
              <div className="w-full">
                <h3 className="text-center text-3xl xs:text-4xl font-black tracking-tighter bg-white/[0.8]">
                  {game?.title || "This is game for kid"}
                </h3>
                <p className="text-center text-lg font-medium tracking-tighter bg-white/[0.8]">
                  {game?.desc || "How to fixed the problem?"}
                </p>
              </div>
              <div className="w-full flex justify-center">
                <button className="mx-auto py-2 px-5 text-center text-2xl xs:text-4xl font-black bg-white rounded-full border-b-4 border-green-200 hover:border-b-2 duration-100">
                  Get it
                </button>
              </div>
            </div>
          </div>
          <h3 className="text-center text-2xl font-black tracking-tighter mt-10">
            Best For Today
          </h3>
          <div className="w-full flex flex-wrap">
            <CardKidsGame />
            <CardKidsGame />
            <CardKidsGame />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
