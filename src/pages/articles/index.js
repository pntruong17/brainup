import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import Image from "next/image";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/components/helper/utils";

const Index = ({ posts }) => {
  const idSEO = 0;
  const [postSEO, setPostSEO] = useState(posts[idSEO]);
  const [otherPosts, setOtherPosts] = useState(() =>
    posts.filter((post, i) => i !== 0 && i !== 1)
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
          class="text-_dark body-font px-3"
        >
          <div class="max-w-[56rem] h-auto pt-16 md:pt-24 mx-auto font-Nunito">
            <div className="flex flex-wrap">
              <Link
                href={"/articles/" + postSEO.slug}
                className="w-full md:w-1/2 min-h-[30rem] overflow-hidden relative rounded-xl my-3"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="max-w-full min-h-full hover:cursor-pointer"
                  src={postSEO.frontmatter.cover_image}
                  alt="blog image"
                />
                <div className="absolute bottom-5 w-full">
                  <div className="w-[90%] mx-auto bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl md:text-3xl font-black hover:text-_blue hover:cursor-pointer">
                      {postSEO.frontmatter.title}
                    </h2>
                    <p className="text-base mt-5">
                      {postSEO.frontmatter.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href={"/articles/" + posts[1].slug}
                className="w-full min-h-[30rem] md:w-1/2 md:px-10 my-3 overflow-hidden"
              >
                <div className="relative w-full h-1/2 rounded-t-xl hover:cursor-pointer overflow-hidden flex justify-center items-center">
                  <Image
                    fill
                    objectFit="cover"
                    loading="lazy"
                    className="h-full hover:cursor-pointer"
                    src={posts[1].frontmatter.cover_image}
                    alt="image blog"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-2xl md:text-3xl font-black hover:text-_blue hover:cursor-pointer">
                    {posts[1].frontmatter.title}
                  </h2>
                  <p className="text-base mt-5">
                    {posts[1].frontmatter.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          {posts.length > 0 && (
            <div className="max-w-[56rem] border-8 py-10 mx-auto">
              <h2 className="text-xl font-semibold border-b-2 py-2 m-4">
                THIS JUST IN
              </h2>
              <div className="flex flex-wrap">
                <div className="w-full flex flex-wrap p-2">
                  {otherPosts.map((post, i) => {
                    return (
                      <Link
                        key={i}
                        href={"/articles/" + post.slug}
                        className="flex tablet:w-1/2 p-2 hover:cursor-pointer"
                      >
                        <div className="h-36">
                          <Image
                            fill
                            objectFit="cover"
                            src={post.frontmatter.cover_image}
                            alt="image blog"
                          />
                        </div>
                        <div className="px-5">
                          <h2 className="text-xl font-semibold hover:text-_blue tracking-tight">
                            {post.frontmatter.title}
                          </h2>
                          <p className="text-md mt-1 tracking-tight">
                            {post.frontmatter.excerpt}
                          </p>
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

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("src/posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}

export default Index;
