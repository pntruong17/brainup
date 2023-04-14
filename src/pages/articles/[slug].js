import { motion } from "framer-motion";
import detail from "./blog.module.css";
import Layout from "@/components/Layout";
import {
  QUERY_SINGLE_POST,
  SLUG_LIST,
  graphqlcms,
} from "@/components/graphqlcms/graphql";

const BlogPost = ({ post, slug }) => {
  return (
    <Layout
      pageMeta={{
        title: post.title,
        description: post.excerpt,
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
            {post.title}
          </h1>
          <div
            className={`${detail.html} font-Nunito`}
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
  const _paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths: _paths,
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
      slug,
    },
    revalidate: 10,
  };
};
