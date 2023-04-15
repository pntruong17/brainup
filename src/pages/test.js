import React, { useEffect, useState } from "react";
import {
  returnTopTenNeuronsUsers,
  addNeuronAndIdTrivia,
} from "@/firebase/usersFirebase";
import {
  saveRecordTrivia,
  calculatePercentageIncrease,
} from "@/firebase/quizFirebase";

const newRecord = {
  uid: "0101",
  idTrivia: "trivia0010",
  neurons: 1541,
};

const newRecordTrivia = {
  id: "1111",
  name: "guess this famous singers",
  pointFirstPlayEveryUser: 1234,
};

const newRecordPercent = {
  id: "0101",
  pointFirstPlayEveryUser: 2700,
};

const Test = () => {
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [percent, setPercent] = useState([]);

  const getTop = async () => {
    const _top = await returnTopTenNeuronsUsers();
    setTopTenUsers(_top);
  };

  const saveTrivia = async (newRecordTrivia) => {
    await saveRecordTrivia(newRecordTrivia);
  };

  const percentages = async (newRecordPercent) => {
    const pc = await calculatePercentageIncrease(newRecordPercent);
    setPercent(pc);
  };

  useEffect(() => {
    //saveTrivia(newRecordTrivia);
    percentages(newRecordPercent);
  }, []);
  return (
    <>
      <div>
        {topTenUsers.map((user) => (
          <div key={user.uid}>{user.uid}</div>
        ))}
      </div>
      <h2>{percent}</h2>
    </>
  );
};

export default Test;
