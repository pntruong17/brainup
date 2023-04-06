import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Statistic from "@/components/Statistic";
import GameFeatureIntro from "@/components/GameIntro";
import Testimonial from "@/components/Testimonial";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Brain Up | Home",
        }}
      >
        <Head>
          <meta charset="UTF-8" />
          <meta
            name="description"
            content="Brain up app test iq free and brain games, help your brain faster"
          />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content="Home" />
          <link rel="icon" href="/favicon.ico" />
          <title>Brain Up | Home</title>
        </Head>
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Hero />
          <Statistic />
          <GameFeatureIntro />
          <Testimonial />
        </motion.main>
      </Layout>
    </>
  );
}
