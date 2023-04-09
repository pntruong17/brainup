import React from "react";
import Link from "next/link";

const TriviaCard = ({ trivia, image }) => {
  const { title, group, expert, slug } = trivia;
  return (
    <>
      <div className="w-full h-auto flex my-5 font-Nunito">
        <div className="w-44 h-36 overflow-hidden rounded-lg">
          <img
            className="object-cover object-center cursor-pointer hover:scale-105 duration-200"
            src={image}
            alt={title}
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <Link href={"/trivia-category/" + group}>
            <h4 className="font-bold text-_accent text-lg capitalize hover:underline cursor-pointer">
              {group}
            </h4>
          </Link>
          <Link href={"/trivia/" + slug}>
            <h3 className="font-black text-_dark text-2xl capitalize tracking-tight hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="font-semibold text-_darkblue text-base capitalize">
            {expert}
          </p>
        </div>
      </div>
    </>
  );
};

export default TriviaCard;
