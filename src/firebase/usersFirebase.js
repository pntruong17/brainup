import firebase, { db } from "./firebaseconfig";
import { useState, useEffect } from "react";
import {
  collection,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

//const [users, setUsers] = useState()
//const usersCollectionRef = collection(db, "users");

const sample_userdata = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  numberTestRemain: 0,
  education: "",
  yourdata: {
    iqlvl: "",
    age: "",
    country: "",
  },
};

export const updateUser = async (uid, newData) => {
  const userRef = doc(db, "users", uid); // Get reference to the user document
  const userDoc = await getDoc(userRef); // Get the user document

  if (userDoc.exists()) {
    // Check if the user exists
    await updateDoc(userRef, newData); // Update the document with new data
    console.log("User updated successfully!");
  } else {
    // Create a new user document with the given uid
    await setDoc(userRef, newData);
    console.log("User created successfully!");
  }
};

export const deleteUser = async (uid) => {
  const userDoc = doc(db, "users", uid);
  await deleteDoc(userDoc);
};

export const returnIQTestRemain = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().numberTestRemain);
      return docSnap.data().numberTestRemain;
    } else {
      console.log("No such document!");
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const getYourData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().yourdata);
      return docSnap.data().yourdata;
    } else {
      console.log("No such document!");
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDocById = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().uid);
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkUserExistence = async (collectionId) => {
  try {
    const collectionRef = firebase.firestore().collection("users");
    const doc = await collectionRef.doc(collectionId).get();

    if (doc.exists) {
      console.log("Collection tồn tại.");
      return true;
    } else {
      console.log("Collection không tồn tại.");
      return false;
    }
  } catch (error) {
    console.error("Lỗi khi thực hiện truy vấn: ", error);
    throw error;
  }
};
