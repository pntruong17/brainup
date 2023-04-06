import { GraphQLClient, gql } from "graphql-request";
export const graphqlcms = new GraphQLClient(process.env.GRAPHQL_CONENT_API_ID);

export const QUERY_POSTS = gql`
  {
    posts {
      content {
        html
      }
      coverImage {
        createdAt
        url
      }
      slug
      title
      tags
      excerpt
    }
  }
`;

export const SLUG_LIST = gql`
  {
    posts {
      slug
    }
  }
`;
export const QUERY_SINGLE_POST = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      content {
        html
      }
      coverImage {
        id
        createdAt
        url
      }
      id
      slug
      title
      tags
    }
  }
`;
