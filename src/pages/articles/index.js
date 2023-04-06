import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { graphqlcms, QUERY_POSTS } from "@/components/graphqlcms/graphql";
import Layout from "@/components/Layout";

const Index = ({ posts }) => {
  const [blogSEO, setBlogSEO] = useState(() =>
    posts.filter((post) => post.tags.includes("SEO"))
  );
  const [blogs, setBlogs] = useState(() =>
    posts.filter((post) => !post.tags.includes("SEO"))
  );
  return (
    <>
      <Layout
        pageMeta={{
          title: "Article | Brain Up",
          description:
            "Article, Useful information to help the brain stay healthy and work efficiently",
        }}
      >
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          class="text-_dark body-font"
        >
          <div class="max-w-7xl px-5 pt-24 mx-auto font-Nunito">
            <div className="flex flex-wrap">
              <Link
                href={"/articles/" + blogSEO[0].slug}
                className="w-full tablet:w-1/2 h-[35rem] overflow-hidden relative rounded-xl my-3"
              >
                <img
                  className="max-w-full min-h-full hover:cursor-pointer"
                  src={blogSEO[0].coverImage.url}
                />
                <div className="absolute bottom-5 w-full">
                  <div className="w-[90%] mx-auto bg-white p-10 rounded-lg shadow">
                    <h2 className="text-3xl font-black hover:text-_blue hover:cursor-pointer">
                      {blogSEO[0].title}
                    </h2>
                    <p className="text-base mt-5">{blogSEO[0].excerpt}</p>
                  </div>
                </div>
              </Link>
              <Link
                href={"/articles/" + blogSEO[1].slug}
                className="w-full h-[35rem] tablet:w-1/2 tablet:px-10 my-3"
              >
                <img
                  className="w-full object-cover h-2/3 rounded-t-xl hover:cursor-pointer"
                  src={blogSEO[1].coverImage.url}
                />
                <div className="p-5">
                  <h2 className="text-3xl font-black hover:text-_blue hover:cursor-pointer">
                    {blogSEO[1].title}
                  </h2>
                  <p className="text-base mt-5">{blogSEO[1].excerpt}</p>
                </div>
              </Link>
            </div>
          </div>
          {blogs.lenght > 0 && (
            <div className="max-w-7xl py-10 mx-auto">
              <h2 className="text-xl font-semibold border-b-2 py-2 m-4">
                THIS JUST IN
              </h2>
              <div className="flex flex-wrap">
                <div className="w-full flex flex-wrap p-2">
                  {blogs.map((post, i) => {
                    return (
                      <Link
                        key={i}
                        href={"/articles/" + post.slug}
                        className="flex tablet:w-1/2 p-2 hover:cursor-pointer"
                      >
                        <img
                          className="h-36 object-cover"
                          src={post.coverImage.url}
                        />
                        <div className="px-5">
                          <h2 className="text-xl font-semibold hover:text-_blue tracking-tight">
                            {post.title}
                          </h2>
                          <p className="text-md mt-1 tracking-tight">{"..."}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.section>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const { posts } = await graphqlcms.request(QUERY_POSTS);

  return {
    props: { posts },
    revalidate: 10,
  };
};

export default Index;
