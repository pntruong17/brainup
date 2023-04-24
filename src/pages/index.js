import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
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
        </motion.main>
      </Layout>
    </>
  );
}
