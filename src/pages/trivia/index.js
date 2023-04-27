import React, { useState } from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import TriviaCard from "@/trivia/TriviaCard";
import LayoutTrivia from "@/components/LayoutTrivia";

const Index = ({ triviaData }) => {
  const seoID = 0;
  const seoID2 = 1;
  const [otherTrivia, setOtherTrivia] = useState(() => {
    const other = triviaData.filter(
      (item) => item.id !== seoID && item.id !== seoID2
    );
    return other;
  });
  console.log(triviaData[0].title);
  return (
    <>
      <Layout
        pageMeta={{
          title: "Article | Brain Up",
          description:
            "Article, Useful information to help the brain stay healthy and work efficiently",
        }}
      >
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="body-font px-3"
        >
          <div class="max-w-[56rem] h-auto pt-16 md:pt-24 mx-auto font-Nunito">
            <div className="flex flex-wrap">
              <Link
                href={"/trivia/" + triviaData[seoID].slug}
                className="w-full md:w-1/2 min-h-[30rem] overflow-hidden relative rounded-xl my-3"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="max-w-full min-h-full hover:cursor-pointer"
                  src={triviaData[seoID].image}
                  alt="blog image"
                />
                <div className="absolute bottom-5 w-full">
                  <div className="w-[90%] mx-auto bg-white/[0.68] text-_bg_dark p-6 rounded-lg shadow">
                    <h2 className="text-2xl md:text-3xl font-black hover:text-_blue hover:cursor-pointer">
                      {triviaData[seoID].title}
                    </h2>
                    <p className="text-base mt-5">{triviaData[seoID].expert}</p>
                  </div>
                </div>
              </Link>
              <Link
                href={"/articles/" + triviaData[seoID2].slug}
                className="w-full h-auto md:min-h-[30rem] md:w-1/2 md:pl-10 my-3 "
              >
                <div className="w-full h-full overflow-hidden rounded-xl dark:bg-_darkblue">
                  <div className="relative w-full h-56 md:h-1/2  hover:cursor-pointer overflow-hidden flex justify-center items-center ">
                    <Image
                      fill
                      objectFit="cover"
                      loading="lazy"
                      className="h-full hover:cursor-pointer"
                      src={triviaData[seoID2].image}
                      alt="image blog"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="text-2xl md:text-3xl font-black hover:text-_blue hover:cursor-pointer">
                      {triviaData[seoID2].title}
                    </h2>
                    <p className="text-base my-6">
                      {triviaData[seoID2].expert}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {otherTrivia.length > 0 && (
            <div className="max-w-[56rem] py-10 mx-auto flex flex-col font-Nunito">
              <h2 className="text-xl font-semibold border-b-2 py-2 my-4">
                THIS JUST IN
              </h2>
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2">
                {otherTrivia.map((trivia, i) => {
                  return (
                    <Link
                      key={i}
                      href={"/articles/" + trivia.slug}
                      className="flex w-full my-2 hover:cursor-pointer px-1"
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden dark:bg-_darkblue">
                        <div className="h-36 relative">
                          <Image
                            fill
                            objectFit="cover"
                            src={trivia.image}
                            alt="image blog"
                          />
                        </div>
                        <div className="px-5">
                          <h2 className="text-xl font-black hover:text-_blue tracking-tight my-1">
                            {trivia.title}
                          </h2>
                          <p className="text-base my-1 tracking-tight">
                            {trivia.expert}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </motion.section>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "src", "trivia", "triviaData.json");

  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents);

  return {
    props: {
      triviaData: triviaData.questions,
    },
  };
};

export default Index;
