import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import Hamburger from "./subcomponents/Hamburger";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const [imgUser, setImgUser] = useState();
  const [popover, setPopover] = useState(false);
  const { user, logOut } = useUserAuth();
  const navigate = useRouter();

  let Links = [
    {
      name: "Test IQ Free",
      link: "/test-iq",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>`,
    },
    {
      name: "Brain Games",
      link: "/brain-games",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>`,
    },
    {
      name: "Articles",
      link: "/articles",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>`,
    },
    //{ name: "Blog", link: "/blog" },
  ];
  let [open, setOpen] = useState(false);
  const [hasColor, setHascolor] = useState("bg-white md:bg-transparent");
  /*

    if (typeof window !== "undefined") {
        const handleColor = () => {
            if (window.scrollY >= 100) {
                setHascolor('nav-blur')
            } else {
                setHascolor('bg-transparent')
            }
        }

        window.addEventListener('scroll', handleColor)
    }
*/

  useEffect(() => {
    if (user) {
      setImgUser(user.photoURL);
      console.log(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    const handleColor = () => {
      if (window.scrollY >= 100) {
        setHascolor("md:nav-blur");
      } else {
        setHascolor("bg-white md:bg-transparent");
      }
    };

    window.addEventListener("scroll", handleColor);

    // return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleColor);
    };
  }, []);

  const signOutGoogle = () => {
    setPopover(false);
    logOut();
    navigate.push("/");
    console.log("sign out");
  };
  const handleSignIn = () => {
    navigate.push("/login");
  };

  return (
    <div
      className={`w-full fixed z-50 top-0 left-0 bg-white shadow-sm md:shadow-none ${hasColor}`}
    >
      <div
        className={`max-w-7xl mx-auto md:flex items-center justify-between  py-4 px-5`}
      >
        <div className="text-base cursor-pointer flex items-center text-gray-800">
          <Link
            href={"/"}
            className="flex font-medium items-center text-gray-900 md:mb-0"
          >
            <img
              className="h-8"
              src={"/images/logo/logodark.png"}
              alt="logo iqup"
            />
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <Hamburger openMenu={open} setOpenMenu={setOpen} />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 px-5 pt-10 md:pt-0 absolute top-14 md:static bg-white md:bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 border-b md:border-none transition-all duration-500 ease-in ${
            open ? " " : "hidden"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-5 md:my-0 py-3 border-b md:border-none"
            >
              <Link
                href={link.link}
                className="font-Inter text-base font-medium text-gray-800 hover:text-green-400 duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <div className="relative pt-5 md:pt-0">
            {user ? (
              <Image
                onClick={() => setPopover(true)}
                className="rounded-full md:ml-5 text-md md:my-0 cursor-pointer"
                src={imgUser}
                alt="user"
                width={40}
                height={40}
              />
            ) : (
              <button onClick={handleSignIn} className="btn-getstarted ml-3">
                Get Started
              </button>
            )}
            {popover && (
              <div className="absolute top-12 md:right-0 w-52 h-auto bg-white rounded-md border py-1 shadow-sm">
                <svg
                  onClick={() => setPopover(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="gray"
                  className="absolute top-2 right-2 w-6 h-6 cursor-pointer hover:bg-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <h5 className="text-sm text-gray-500 px-4 py-1 cursor-pointer">
                  Signed in as
                </h5>
                <h5 className="text-base text-gray-600 font-semibold px-4 pb-3 border-b cursor-pointer">
                  {user.displayName}
                </h5>
                <Link href={"/user"}>
                  <div className="text-base text-gray-500 mt-2 px-4 py-1 hover:bg-green-500/[0.8] hover:text-white cursor-pointer">
                    Your IQ score
                  </div>
                </Link>

                <h5
                  onClick={signOutGoogle}
                  className="text-base text-gray-500 mb-2 px-4 py-1 hover:bg-green-500/[0.8] hover:text-white cursor-pointer"
                >
                  Sign out
                </h5>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(Navbar);
