import React from "react";
import fs from "fs";
import path from "path";
import TriviaCard from "@/trivia/TriviaCard";
import LayoutTrivia from "@/components/LayoutTrivia";

const Index = ({ triviaData }) => {
  console.log(triviaData[0].title);
  return (
    <>
      <LayoutTrivia
        pageMeta={{
          title: "Trivia | Brain up",
          description: "Trivia",
        }}
      >
        <div className="w-full min-h-screen pt-6 sm:pt-10 bg-[#16202C] px-3">
          <h2 className="font-black text-4xl text-center text-_contrast_bg font-Nunito underline sm:mb-8">
            Trivia
          </h2>
          <div className="max-w-[680px] shadow-sm mx-auto sm:border rounded-xl">
            {triviaData.map((trivia, i) => {
              return (
                <TriviaCard key={i} trivia={trivia} image={`${trivia.image}`} />
              );
            })}
          </div>
          <div className="w-full"></div>
        </div>
      </LayoutTrivia>
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