import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { motion } from "framer-motion";
import { getBlogDetail } from "@/discussions/blog";
import parse from "html-react-parser";
import detail from "./blog.module.css";
import BlogHeader from "@/components/BlogHeader";
import Layout from "@/components/Layout";
import {
  QUERY_SINGLE_POST,
  SLUG_LIST,
  graphqlcms,
} from "@/components/graphqlcms/graphql";

const BlogPost = ({ post }) => {
  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        <div className="py-20">
          <h1 className="text-center my-10 text-[2rem] font-bold">
            {post.title}
          </h1>
          <div className="flex justify-center mb-4">
            <BlogHeader />
          </div>
          <div
            className={`${detail.html} flex flex-col`}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths = async () => {
  const { posts } = await graphqlcms.request(SLUG_LIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const data = await graphqlcms.request(QUERY_SINGLE_POST, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
