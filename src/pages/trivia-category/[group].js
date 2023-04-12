import React from "react";
import TriviaCard from "@/trivia/TriviaCard";
import fs from "fs";
import path from "path";
import LayoutTriviaGroup from "@/components/LayoutTriviaGroup";

const index = ({ triviByGroup }) => {
  return (
    <>
      <LayoutTriviaGroup
        pageMeta={{
          title: " | Trivia",
          description: "Trivia",
        }}
      >
        <div className="w-full min-h-screen pt-6 sm:pt-10 bg-[#16202C] px-3">
          <h2 className="font-black text-4xl text-center text-_contrast_bg font-Nunito underline sm:mb-8">
            Sports
          </h2>
          <div className="max-w-[680px] bg-_contrast_bg shadow-sm mx-auto p-3 rounded-xl">
            {triviByGroup.map((trivia, i) => {
              return (
                <TriviaCard key={i} trivia={trivia} image={`${trivia.image}`} />
              );
            })}
          </div>
          <div className="w-full"></div>
        </div>
      </LayoutTriviaGroup>
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
