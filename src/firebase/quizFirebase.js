import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";
//import { useState, useEffect } from "react";

//const [users, setUsers] = useState()

let codesampple = {
  gender: 0,
  age: 35,
  country: "Vietnam",
  education: "High Shool",
  iqpoint: 100,
  time: 90,
  wrongs: [],
};

export const createQuiz = async (data) => {
  // Add a new document with a generated id
  const newCityRef = doc(collection(db, "quizs"));

  await setDoc(newCityRef, data);
};

export const getQuiz = async () => {
  const quizDoc = [];
  const querySnapshot = await getDocs(collection(db, "quizs"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    quizDoc.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return quizDoc;
};
