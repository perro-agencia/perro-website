export const resolve = {
  mainDocuments: [
    {
      route: "/portfolio/:slug",
      filter: `_type == "project" && slug.current == $slug`,
    },
    {
      route: "/blog/:slug",
      filter: `_type == "post" && slug.current == $slug`,
    },
  ],
}
