import React from "react";
import Layout from "@/components/Layout";
import TriviaCard from "@/trivia/TriviaCard";
import fs from "fs";
import path from "path";

const index = ({ triviByGroup }) => {
  return (
    <>
      <Layout
        pageMeta={{
          title: " | Trivia",
          description: "Trivia",
        }}
      >
        <div className="w-full pt-32 px-5">
          <div className="max-w-[680px] shadow-sm mx-auto border px-5 rounded-xl">
            <h2 className="text-3xl text-center font-bold text-_green font-Nunito">
              Sports
            </h2>
            {triviByGroup.map((trivia, i) => {
              return (
                <TriviaCard key={i} trivia={trivia} image={`${trivia.image}`} />
              );
            })}
          </div>
          <div className="w-full"></div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "src", "/trivia", "group.json");
  const fileContents = await fs.readFileSync(filePath, "utf8");
  const groupJSON = await JSON.parse(fileContents); // Thay đổi tại đây
  const _pathByGroup = groupJSON.map((gr) => ({
    params: { group: gr },
  }));
  console.log(_pathByGroup);
  return {
    paths: _pathByGroup,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const group = params.group;
  const filePath = path.join(
    process.cwd(),
    "src",
    "/trivia",
    "triviaData.json"
  );

  const fileContents = await fs.readFileSync(filePath, "utf8");
  const triviaData = await JSON.parse(fileContents);
  const triviByGroup = triviaData.questions.filter(
    (trivi) => trivi.group === group
  );
  return {
    props: {
      triviByGroup: triviByGroup,
    },
  };
};
export default index;
