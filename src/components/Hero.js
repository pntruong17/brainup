import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-20 md:py-44 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
            <h1 className="mt-4 font-Inter font-bold text-3xl md:text-5xl text-gray-900 tracking-tighter md:leading-[1.15]">
              Improve your mind with{" "}
              <span className="text-green-500 cursor-pointer">brain games</span>{" "}
              and{" "}
              <span className="text-green-500 cursor-pointer">
                free IQ tests
              </span>{" "}
              to measure your logic.
            </h1>
            <p className="my-8 leading-relaxed font-Inter text-base md:text-xl text-gray-600 tracking-tight">
              Unlock Your Potential with Our Free IQ Test and Brain Games!{" "}
              <br />
              Take the challenge and discover your IQ score.
            </p>
            <div className="flex justify-center">
              <Link
                href={"/test-iq"}
                className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Test IQ</span>
              </Link>

              <Link
                href={"/brain-games"}
                className="ml-2 rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Play Brain Games</span>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://media.istockphoto.com/id/1133376754/vector/laboratory-scientist-group-study-human-brain-and-psychology-medical-research-microscope-head.jpg?b=1&s=170667a&w=0&k=20&c=pUs76aQWnmjzFmfJu-rkU6tDjyjK7sXsTDtcewA60PQ="
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
