import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getYourData } from "@/firebase/usersFirebase";
import { useUserAuth } from "@/components/helper/UserAuthContextProvider";
import ResultTesting from "@/components/subcomponents/ResultTesting";
import Link from "next/link";

const User = () => {
  const navigate = useRouter();
  const [yourdata, setYourData] = useState();
  const [tested, setTested] = useState("loading");
  const { user } = useUserAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getYourData(user.uid);
        if (data) {
          setTested(true);
          setYourData(data);
        } else {
          setTested(false);
        }
      } else {
        navigate.push("/");
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {}, [yourdata]);
  return (
    <>
      <Layout
        pageMeta={{
          title: "User Login",
        }}
      >
        <div className="m-2 md:m-20">
          {yourdata !== undefined && tested && (
            <ResultTesting yourdata={yourdata} />
          )}
          {yourdata === undefined && !tested && (
            <div className="max-w-xl mx-auto h-96">
              <h2 className="text-_dark mt-36 font-medium text-center tracking-tight">
                <span className="font-bold text-_accent">Notification:</span>{" "}
                You haven&apos;t taken the IQ Test yet. Please click on button
                below to find out your intelligence quotient.
              </h2>
              <div className="flex justify-center my-10">
                <Link
                  href={"/test-iq"}
                  className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
                >
                  <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-20 flex items-center text-sm">
                    <svg
                      className="relative w-5 h-5 mr-2 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWnejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Check it out!
                  </span>
                </Link>
              </div>
            </div>
          )}

          {tested === "loading" && (
            <div className="max-w-xl mx-auto h-96">
              <div className="flex justify-center my-10">
                <button type="button" className="bg-indigo-500" disabled>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  ></svg>
                  Processing...
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default User;
