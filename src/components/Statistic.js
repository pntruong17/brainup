import React from "react";

const Statistic = () => {
  return (
    <>
      <section className="text-gray-600 font-Nunito">
        <div className="max-w-6xl px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-4xl font-bold mb-4 text-_dark tracking-tighter">
              The effectiveness of our IQ test
            </h2>
            <p className=" mx-auto leading-relaxed text-lg tracking-tight">
              The IQ test we provide has been used by millions of users
              worldwide{" "}
              <span className="font-bold text-md">
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
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border bg-slate-50 px-4 py-4 rounded-lg">
                <p className="leading-relaxed tracking-tighter text-xs font-semibold text-_dark pb-3">
                  Top Daily Test Count
                </p>
                <h2 className="title-font font-black text-3xl text-gray-900">
                  1.6K
                </h2>
                <p className="leading-relaxed tracking-tighter">
                  Daily Test Count
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border bg-slate-50 px-4 py-4 rounded-lg">
                <p className="leading-relaxed tracking-tighter text-xs font-semibold text-_dark pb-3">
                  Top IQ by User
                </p>
                <h2 className="title-font font-black text-3xl text-gray-900">
                  134
                </h2>
                <p className="leading-relaxed tracking-tighter">Japan</p>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border bg-slate-50 px-4 py-4 rounded-lg">
                <p className="leading-relaxed tracking-tighter text-xs font-semibold text-_dark pb-3">
                  Top IQ by Field
                </p>
                <h2 className="title-font font-black text-3xl text-gray-900">
                  107
                </h2>
                <p className=" leading-relaxed tracking-tighter">
                  Computer Science
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border bg-slate-50 px-4 py-4 rounded-lg">
                <p className="leading-relaxed tracking-tighter text-xs font-semibold text-_dark pb-3">
                  Top IQ by Age
                </p>
                <h2 className="title-font font-black text-3xl text-gray-900">
                  106
                </h2>
                <p className="leading-relaxed tracking-tighter">Age: 19-39</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistic;
