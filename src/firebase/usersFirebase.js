import firebase, { db } from "./firebaseconfig";
import {
  collection,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
  } else {
    // Create a new user document with the given uid
    await setDoc(userRef, newData);
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
      return docSnap.data().numberTestRemain;
    } else {
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
      return docSnap.data().yourdata;
    } else {
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
      return docSnap.data();
    } else {
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
