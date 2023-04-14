import React, { useState } from "react";
import Link from "next/link";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import LayoutEmpty from "@/components/LayoutEmpty";

const Index = ({ slug }) => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setNote("Password reset email sent!");
      //router.push("/");
    } catch (er) {
      console.log(er);
      setError(
        "Incorrect password. If you forgot your password click here to create a new password"
      );
    }
  };
  return (
    <>
      <LayoutEmpty
        pageMeta={{
          title: "Get New Password",
          description: "Get New Password",
        }}
      >
        <header className="w-full text-gray-600 body-font bg-white shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center text-gray-900 md:mb-0"
            >
              <img
                className="h-6"
                src={"/images/logo/logodark.png"}
                alt="logo iqup"
              />
            </Link>
            <h3 className="md:ml-auto flex flex-wrap items-center text-xs justify-center font-medium">
              {"Forget the Password"}
            </h3>
          </div>
        </header>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="max-w-lg bg-white rounded-lg border shadow-md p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
              <div className="w-full">
                <h3 className="font-semibold text-lg text-_darkblue my-5 text-center">
                  Enter your registered email address here
                </h3>
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="w-full flex items-center mb-3">
                    <label
                      className="mr-5 flex-1 text-right font-medium text-sm"
                      htmlFor="email"
                    >
                      Your Email
                    </label>
                    <input
                      className="w-3/4 px-5 py-1 border rounded-lg"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button className="donate-button mx-auto mt-8" type="submit">
                    Send a password reset email
                  </button>
                </form>
                <h3 className="text-base text-_red my-5 text-center">{note}</h3>
              </div>
            </div>
          </div>
        </section>
        s
      </LayoutEmpty>
    </>
  );
};

export default Index;
