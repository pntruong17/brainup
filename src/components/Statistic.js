import React from "react";
import Image from "next/image";

const Statistic = () => {
  return (
    <>
      <section className="text-gray-600 font-Inter">
        <div className="max-w-6xl px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-4xl font-bold mb-4 text-_dark tracking-tighter">
              The effectiveness of our IQ test
            </h2>
            <p className="mx-auto leading-relaxed text-base tracking-tight">
              The IQ test we provide has been used by millions of users
              worldwide{" "}
              <span className=" ">
                &#40; We will immediately eliminate any fraudulent test attempts
                &#41;
              </span>
              , and new users join every day. The statistical data provided and
              established by the total results helps to verify its reliability,
              related to the standardized IQ scoring system represented by a
              Gaussian function graph, which is feasible.
            </p>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 xs:w-1/2 w-full">
              <div className="bg-cyan-100 min-h-[150px] flex px-4 py-4 rounded-3xl">
                <div className="w-1/2 flex flex-col justify-center">
                  <h2 className="title-font font-black text-3xl text-gray-900">
                    1.6K
                  </h2>
                  <p className="text-sm tracking-tighter">Daily Test</p>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <svg
                    className="w-10 h-10 text-cyan-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/4 xs:w-1/2 w-full">
              <div className="bg-red-100 min-h-[150px] flex px-4 py-4 rounded-3xl">
                <div className="w-1/2 flex flex-col justify-center">
                  <h2 className="title-font font-black text-3xl text-gray-900">
                    134
                  </h2>
                  <p className="text-sm tracking-tighter">Top User</p>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <Image
                    src={"/images/flag-japan.png"}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/4 xs:w-1/2 w-full">
              <div className="bg-green-100 min-h-[150px] flex px-4 py-4 rounded-3xl">
                <div className="w-1/2 flex flex-col justify-center">
                  <h2 className="title-font font-black text-3xl text-gray-900">
                    107
                  </h2>
                  <p className="text-sm tracking-tighter">Top Field</p>
                  <p className="text-sm tracking-tighter">Computer Science</p>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 text-green-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/4 xs:w-1/2 w-full">
              <div className="bg-slate-200 min-h-[150px] flex px-4 py-4 rounded-3xl">
                <div className="w-1/2 flex flex-col justify-center">
                  <h2 className="title-font font-black text-3xl text-gray-900">
                    106
                  </h2>
                  <p className="text-sm tracking-tighter">Age: 19-39</p>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <Image src={"/images/age-group.png"} width={50} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistic;
