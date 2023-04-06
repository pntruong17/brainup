import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "@/firebase/firebaseconfig";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [iuser, setIuser] = useState();

  const logIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    return await signOut(auth);
  };
  const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleAuthProvider);
  };

  const remakeIUSER = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setIuser(docSnap.data());
      } else {
        return null;
        // doc.data() will be undefined in this case
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      remakeIUSER();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <userAuthContext.Provider
        value={{
          user,
          logIn,
          signUp,
          logOut,
          googleSignIn,
          iuser,
          setIuser,
          remakeIUSER,
        }}
      >
        {children}
      </userAuthContext.Provider>
    </>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
