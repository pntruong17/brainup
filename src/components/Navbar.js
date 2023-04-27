import React, { useState, useEffect, memo, useId } from "react";
import Link from "next/link";
import axios from "axios";
import Hamburger from "./subcomponents/Hamburger";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import { useRouter } from "next/router";
import { Links } from "@/libs/menuItem";
import Image from "next/image";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const links = [
  //   { id: "articles", slug: "/articles", child: undefined },
  //   {
  //     id: "games for brain",
  //     slug: "/brain-games",
  //     child: [
  //       { id: "brain games", slug: "/brain-games" },
  //       { id: "kids games", slug: "/kid-games" },
  //     ],
  //   },
  //   { id: "trivia", slug: "/trivia", child: undefined },
  //   { id: "test IQ", slug: "/test-iq", child: undefined },
  // ];
  const links = [
    { id: "articles", slug: "/articles", child: undefined },
    { id: "brain games", slug: "/brain-games", child: undefined },
    { id: "trivia", slug: "/trivia", child: undefined },
    { id: "test IQ", slug: "/test-iq", child: undefined },
  ];
  const id = useId();
  const [imgUser, setImgUser] = useState();
  const [verticalMenu, setVerticalMenu] = useState(true);
  const [popover, setPopover] = useState(false);
  const { user, logOut } = useUserAuth();
  const navigate = useRouter();

  const [open, setOpen] = useState(false);
  const [hasColor, setHascolor] = useState("bg-white md:bg-transparent");
  /*

    if (typeof window !== "undefined") {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setHascolor('nav-blur')
            } else {
                setHascolor('bg-transparent')
            }
        }

        window.addEventListener('scroll', handleScroll)
    }
*/

  const logOutRemoveCookie = async () => {
    const user = await axios.get("/api/auth/logout");

    console.log(user);
  };

  useEffect(() => {
    if (user) {
      setImgUser(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        //setHascolor("md:nav-blur");
        setVerticalMenu(false);
      } else {
        //setHascolor("bg-white md:bg-transparent");
        setVerticalMenu(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const signOutGoogle = () => {
    setPopover(false);
    setOpen(false);
    logOut();
    logOutRemoveCookie();
    navigate.push("/");
  };
  const handleSignIn = () => {
    navigate.push("/login");
  };

  return (
    <>
      <div
        className={`w-full z-50 fixed top-0 left-0 bg-white dark:bg-_bg_dark ${
          verticalMenu ? "" : "border-b dark:border-none dark:shadow-md"
        }`}
      >
        <div
          className={`z-50 max-w-[56rem] mx-auto ${
            verticalMenu
              ? "flex-row sm:flex-col h-[50px] sm:h-[100px] flex justify-between sm:justify-center items-center"
              : "flex-row h-[50px] flex justify-between items-center"
          } `}
        >
          <Link href={"/"}>
            <div
              className={`relative w-28   ${
                verticalMenu ? "h-6 sm:h-8 mt-2" : "h-6"
              }`}
            >
              {theme === "light" ? (
                <Image
                  src={"/images/logo/logodark.png"}
                  fill
                  objectFit="contain"
                  alt="brain up"
                />
              ) : (
                <Image
                  src={"/images/logo/logowhite.png"}
                  fill
                  objectFit="contain"
                  alt="brain up"
                />
              )}
            </div>
          </Link>
          <div>
            <div className="hidden sm:block">
              <ul className="flex my-1 text-sm">
                {links.map((link) => (
                  <li
                    key={link.id}
                    className="mx-3 cursor-pointer capitalize hover:text-_pink relative group py-3"
                  >
                    <Link href={link.slug}>{link.id}</Link>
                    {link.child !== undefined && (
                      <ul className="font-medium text-_darkblue pl-5 absolute top-10 -left-3 w-[150px] bg-white border rounded hidden group-hover:block">
                        {link.child.map((child) => (
                          <li
                            key={child.id}
                            className="capitalize my-2 cursor-pointer hover:text-_pink"
                          >
                            <Link href={child.slug}>{child.id}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:hidden mr-5 w-6 h-6">
              <Hamburger openMenu={open} setOpenMenu={setOpen} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-10 w-full h-screen top-0 left-0 bg-white dark:bg-_bg_dark px-10 pt-[60px] ${
          open ? "block sm:hidden" : "hidden"
        }`}
      >
        <ul className="text-lg font-semibold">
          {links.map((link) => (
            <>
              <li
                key={link.id}
                className="capitalize my-2 cursor-pointer border-b hover:text-_pink"
              >
                <Link href={link.slug}>{link.id}</Link>
              </li>
              <ul className="text-base font-medium pl-5">
                {link.child !== undefined &&
                  link.child.map((child) => (
                    <li
                      key={child.id}
                      className="capitalize my-2 cursor-pointer hover:text-_pink"
                    >
                      <Link href={child.slug}>{child.id}</Link>
                    </li>
                  ))}
              </ul>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default memo(Navbar);
