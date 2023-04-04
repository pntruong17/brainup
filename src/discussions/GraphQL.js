export function discussionGql(ghDiscussionCategoryId) {
  return `{
          repository(owner: "pntruong17", name: "next.iqup") {
              discussions(first: 100, categoryId: "${ghDiscussionCategoryId}") {
                nodes {
                  title
                  url
                  number
                  bodyHTML
                  bodyText
                  createdAt
                  lastEditedAt
                  author {
                    login
                    url
                    avatarUrl
                  }
                   labels(first: 100) {
                    nodes {
                      name
                    }
                  }
                }
              }
            }
      }`;
}

// Single post
export function discussionDetailGql(postId) {
  return `{
      repository(owner: "pntruong17", name: "next.iqup") {
        discussion(number: ${postId}) {
          title
          bodyHTML
          createdAt
          author {
            login
            url
            avatarUrl
          }
        }
      }
    }`;
}
