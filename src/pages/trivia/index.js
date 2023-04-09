import React from "react";
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import TriviaCard from "@/trivia/TriviaCard";

const Index = ({ triviaData }) => {
  console.log(triviaData[0].title);
  return (
    <>
      <Layout
        pageMeta={{
          title: "Trivia | Brain up",
          description: "Trivia",
        }}
      >
        <div className="w-full pt-32 px-5">
          <div className="max-w-[680px] shadow-sm mx-auto border px-5 rounded-xl">
            {triviaData.map((trivia, i) => {
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
