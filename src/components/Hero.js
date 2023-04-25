import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateEmail } from "@/firebase/emailFirebase";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleAddEmail = async () => {
    const newData = { name: "", age: "" };
    const result = await updateEmail(email, newData);
    console.log(result); // true hoặc false tùy vào kết quả thực thi của hàm
  };

  function handleSubmit(event) {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của email
    if (!email || !isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    // Lưu email vào Firestore hoặc gửi email đến server
    handleAddEmail();
    console.log("Email:", email);

    // Reset giá trị của input
    setEmail("");
    setIsEmailValid(true);
  }

  function handleChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(true);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  return (
    <>
      <div className="max-w-[56rem] mx-auto px-3">
        <div className="mt-14 sm:mt-28 p-6 border rounded-2xl mx-1">
          <h1 className="font-Inter font-bold text-xl md:text-2xl tracking-tighter md:leading-[1.15]">
            Improve your mind with{" "}
            <span className="text-_green cursor-pointer">
              <Link href={"/brain-games"}>brain games</Link>
            </span>{" "}
            and{" "}
            <span className="text-_green cursor-pointer">
              <Link href={"/iq-test"}>free IQ tests</Link>
            </span>{" "}
            to measure your logic.
          </h1>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full sm:w-1/3 p-2 text-_bg_dark">
            <Link href={"/test-iq"}>
              <div className="w-full min-h-[200px] rounded-2xl flex bg-_accent_dark group">
                <div className="w-2/3 p-5 flex flex-col justify-start items-start">
                  <h3 className="text-xl font-black">Free Test IQ</h3>
                  <p className="text-xs sm:text-sm mt-2 font-medium">
                    Take the challenge and discover your IQ score
                  </p>
                </div>
                <div className="w-1/3 h-[200px] flex justify-center items-center">
                  <Image
                    width={70}
                    height={70}
                    className="group-hover:scale-110 duration-150"
                    objectFit="contain"
                    src={"/images/system/braintest.png"}
                    alt="Free Test IQ"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="w-1/2 sm:w-1/3 p-2 text-_bg_dark">
            <Link href={"/brain-games"}>
              <div className=" w-full h-[260px] sm:h-[200px] rounded-2xl flex flex-wrap bg-_accent_dark group overflow-hidden">
                <div className="w-full sm:w-2/3 p-5 flex flex-col justify-start items-start">
                  <h3 className="text-xl font-black">Play a brain game!</h3>
                  <p className="text-xs sm:text-sm font-medium mt-2">
                    Playing a few rounds of games can help increase focus for
                    work
                  </p>
                </div>
                <div className="flex justify-center items-center w-full sm:w-1/4 h-[50px] sm:h-full">
                  <Image
                    width={70}
                    height={70}
                    objectFit="contain"
                    className="group-hover:scale-110 duration-150"
                    src={"/images/system/gamebrain.png"}
                    alt="Play a brain game!"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="w-1/2 sm:w-1/3 p-2 text-_bg_dark">
            <Link href={"/trivia"}>
              <div className=" w-full h-[260px] sm:h-[200px] rounded-2xl bg-_accent_dark group">
                <div className="flex justify-center items-center w-full h-[50px]">
                  <Image
                    width={80}
                    height={80}
                    objectFit="contain"
                    className="group-hover:scale-110 duration-150"
                    src={"/images/system/trivia.png"}
                    alt="Trivia games"
                  />
                </div>
                <div className="w-full p-3 flex flex-col justify-end items-center">
                  <h3 className="text-xl font-black">Trivia games</h3>
                  <p className="text-xs sm:text-sm mt-2 font-semibold text-center">
                    Trivia puzzles to test your knowledge of life and science
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-16 mx-3">
          <h3 className="text-xl font-bold text-center border dark:border-none rounded">
            Recently Articles
          </h3>
        </div>
        <div className="flex flex-wrap mt-5">
          <div className="w-full mx-3 min-h-[290px] mb-3 rounded-2xl bg-slate-900 relative overflow-hidden group">
            <div className="absolute z-10 top-5 left-5 max-w-[350px] h-full text-white">
              <h3 className="font-bold  text-2xl group-hover:underline group-hover:text-_green duration-100">
                Guess the Movie by Emoji , Can you guess the movies by emojis? —
                Quiz
              </h3>
              <p className="pt-5 text-sm">
                Can you guess the movies by emojis? Let&apos;s find out and have
                heaps of fun in the guess the movie by emoji quiz!
              </p>
            </div>
            <Image
              fill
              objectFit="cover"
              src={"/images/trivia/2.png"}
              alt="feature post image"
              className="group-hover:scale-105 duration-300 ease-out"
            />
          </div>
          <div className="w-full md:w-1/3 p-3">
            <Link href={"/trivia/guess-the-movie-by-emoji-quiz"}>
              <div className="group rounded-2xl w-full min-h-[280px] p-6 border dark:border-none dark:bg-_darkblue overflow-hidden relative cursor-pointer">
                <h3 className="font-bold text-2xl group-hover:underline group-hover:text-_green duration-100">
                  The Top 9 Brain Foods for Studying and Exams — Articles
                </h3>
                <p className="pt-5 text-sm">
                  Foods that are good for the brain, help you study and work
                  more effectively
                </p>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/3 p-3">
            <Link
              href={"/articles/the-top-9-brain-foods-for-studying-and-exams"}
            >
              <div className="group rounded-2xl w-full min-h-[280px] p-6 border dark:border-none dark:bg-_darkblue overflow-hidden relative cursor-pointer">
                <h3 className="font-bold text-2xl group-hover:underline group-hover:text-_green duration-100">
                  The Top 9 Brain Foods for Studying and Exams — Articles
                </h3>
                <p className="pt-5 text-sm">
                  Foods that are good for the brain, help you study and work
                  more effectively
                </p>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/3 p-3">
            <Link href={"/brain-games/wordl"}>
              <div className="group rounded-2xl w-full min-h-[280px] p-6 border dark:border-none dark:bg-_darkblue overflow-hidden relative cursor-pointer">
                <h3 className="font-bold text-2xl group-hover:underline group-hover:text-_green duration-100">
                  Wordle — Brain Game
                </h3>
                <p className="pt-5 text-sm">
                  Wordle is a popular online word-guessing game where players
                  must guess a five-letter word in six attempts. It&apos;s fun,
                  challenging, and educational.
                </p>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/3 p-3">
            <Link href={"/test-iq"}></Link>
            <div className="group rounded-2xl w-full min-h-[280px] p-6 border dark:border-none dark:bg-_darkblue overflow-hidden relative cursor-pointer">
              <h3 className="font-bold text-2xl group-hover:underline group-hover:text-_green duration-100">
                Get a free IQ Test — IQ
              </h3>
              <p className="pt-5 text-sm">
                Take the challenge and discover your IQ score...
              </p>
              <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-_accent_dark px-5 sm:px-40 py-10 my-10 mx-2 flex flex-col">
          <h2 className="text-5xl font-black text-center text-_bg_dark">
            Get in touch
          </h2>
          <p className="text-center text-_bg_dark mt-3 ">
            We love biulding great user experiences and we are dedicated ti
            creating the app for budgeting
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-5">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter your email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="flex-grow bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-5 mt-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              <button
                type="submit"
                className="text-white bg-black rounded-full border-0 py-3 px-5 focus:outline-none hover:bg-indigo-600 sm:ml-5 text-lg mt-3"
              >
                Subscribe
              </button>
            </form>
          </div>
          {!isEmailValid && (
            <span className="w-full text-center text-_red mt-5">
              Email is not available, please collect later
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
