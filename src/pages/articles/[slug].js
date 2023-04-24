import { motion } from "framer-motion";
import detail from "./blog.module.css";
import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as marked from "marked";

const BlogPost = ({
  frontmatter: { title, date, cover_image, excerpt },
  slug,
  content,
}) => {
  return (
    <Layout
      pageMeta={{
        title: title,
        description: excerpt,
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        <div className="px-8 py-20">
          <h1 className="text-center my-10 text-[3rem] font-Nunito font-black leading-tight">
            {title}
          </h1>
          <div
            className={`${detail.html} font-Nunito`}
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default BlogPost;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
