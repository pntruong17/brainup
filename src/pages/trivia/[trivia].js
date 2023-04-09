import React from "react";
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const Trivia = ({ triviBySlug }) => {
  console.log(triviBySlug.image);
  return (
    <>
      <Layout
        pageMeta={{
          title: triviBySlug.title,
          discription: triviBySlug.expert,
        }}
      >
        <div className="w-full pt-32 px-5">
          <div className="max-w-[680px] shadow-sm mx-auto px-5">
            <div className="w-full h-[600px] rounded-xl border overflow-hidden">
              <div className="w-full bg-teal-700 flex justify-between items-center p-3">
                <div className="w-20 h-16 overflow-hidden rounded-lg">
                  <img
                    className="object-center object-cover "
                    src={`${triviBySlug.image}`}
                  />
                </div>
                <div className="flex">
                  <div className="mx-1 flex flex-col items-center">
                    <div className="w-10 h-10 bg-teal-800  rounded-lg flex items-center justify-center">
                      <h2 className="text-white text-2xl font-black text-center">
                        1
                      </h2>
                    </div>
                    <h3 className="text-xs font-bold text-white">Correct</h3>
                  </div>
                  <div className="mx-1 flex flex-col items-center">
                    <div className="w-10 h-10 bg-teal-800  rounded-lg flex items-center justify-center">
                      <h2 className="text-white text-2xl font-black text-center">
                        9
                      </h2>
                    </div>
                    <h3 className="text-xs font-bold text-white text-center">
                      Question
                      <br />
                      left
                    </h3>
                  </div>
                </div>
                <div>
                  <div class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center relative">
                    <div class="absolute top-[20px] w-2 h-2 bg-teal-800 rounded-full transform"></div>
                    <div class="absolute top-[4px] w-1 h-5 bg-teal-800 rounded-full transform origin-bottom  animate-rotation"></div>
                    <motion.h3
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      key={""}
                      class="absolute top-[-20px] right-0 font-bold text-_w_almost"
                    >
                      +12
                    </motion.h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full"></div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "src", "trivia", "triviaData.json");
  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents); // Thay đổi tại đây
  const _pathBySlug = triviaData.questions.map((trivi) => ({
    params: { trivia: trivi.slug },
  }));
  return {
    paths: _pathBySlug,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slugTrivia = params.trivia;
  const filePath = path.join(process.cwd(), "src", "trivia", "triviaData.json");

  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents);
  const triviBySlug = triviaData.questions.filter(
    (trivi) => trivi.slug === slugTrivia
  );
  return {
    props: {
      triviBySlug: triviBySlug[0],
    },
  };
};
export default Trivia;
