import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Statistic from "@/components/Statistic";
import GameFeatureIntro from "@/components/GameIntro";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Layout>
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
