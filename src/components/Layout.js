import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const Layout = ({ children, pageMeta }) => {
  const router = useRouter();
  const meta = {
    title: "Webapp Brain Up",
    description:
      "This is a Webapp to help test IQ for free and brain games, helps the brain work faster",
    type: "application",
    ...pageMeta,
  };
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://brainup.gg${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:image" content="" />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:site_name"
          content="Webapp IQ test, trivia and Brain game"
        />
        <meta property="og:title" content={meta.title} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="brain games, iq test, trivia, blog" />
        <link rel="icon" href="/favicon.ico" />
        <title>{meta.title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
