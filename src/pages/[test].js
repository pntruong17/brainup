import React from "react";
import {
  graphqlcms,
  QUERY_POSTS,
  SLUG_LIST,
  QUERY_SINGLE_POST,
} from "@/components/graphqlcms/graphql";

const Test = ({ posts }) => {
  return <div>{posts[0].title}</div>;
};

export const getStaticPaths = async () => {
  const { posts } = await graphqlcms.request(SLUG_LIST);
  console.log(posts);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const slug = params.slug || [];
  const data = await graphqlcms.request(QUERY_SINGLE_POST, { slug });
  const post = data.post || [];
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export default Test;
