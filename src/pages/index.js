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
          title: "Brain Up - Brain Games for you today!",
          description:
            "Brain Up is a free IQ test and brain games app that focuses on enhancing cognitive abilities, improving information processing speed, and logical reasoning skills. With Brain Up, you have the opportunity to boost your problem-solving and critical thinking abilities, as well as improve your focus. Discover Brain Up now to develop your mental capacity and become a successful individual in the future.",
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
