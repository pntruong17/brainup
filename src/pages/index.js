import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Statistic from "@/components/Statistic";
import GameFeatureIntro from "@/components/GameIntro";
import Testimonial from "@/components/Testimonial";
import AllTopic from "@/components/AllTopic";

export default function Home() {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Brain Up | Home",
          description:
            "Brain up app test iq free and brain games, help your brain faster",
        }}
      >
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Hero />
          <Statistic />
          <AllTopic />
        </motion.main>
      </Layout>
    </>
  );
}
