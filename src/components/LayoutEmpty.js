import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const LayoutEmpty = ({ children, pageMeta }) => {
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
        <meta charset="UTF-8" />
        <meta name="description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://brainup.io${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Webapp IQ test and Brain game" />
        <meta property="og:title" content={meta.title} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Home" />
        <link rel="icon" href="/favicon.ico" />
        <title>{meta.title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
};

export default LayoutEmpty;
