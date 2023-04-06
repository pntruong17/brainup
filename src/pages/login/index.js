import React from "react";
import Link from "next/link";
import GetStartedForm from "@/components/subcomponents/GetStartedForm";
import { checkUserExistence } from "@/firebase/usersFirebase";
import LayoutEmpty from "@/components/LayoutEmpty";

const LoginPage = ({ data, user }) => {
  return (
    <>
      <LayoutEmpty
        pageMeta={{
          title: "Sign In | Brain Up",
          description: "Sign In to use our services",
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
              {"Already have an account?"}
            </h3>
          </div>
        </header>
        <GetStartedForm userExistance={data} />
      </LayoutEmpty>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const user = getAuth();
    const data = await checkUserExistence(user.uid);
    return {
      props: {
        data: data || null,
        user: user,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

export default LoginPage;
