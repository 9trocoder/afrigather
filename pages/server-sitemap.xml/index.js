import { createClient } from "contentful";
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const response = await client.getEntries({ content_type: "blog" });
  const blogs = await response.items;

//   console.log(blogs);
  let fieldss = [];
  fieldss = blogs.map((blog) => ({
    loc: `https://www.afritrump.com/blog-details/${blog.fields.slug}`,
    lastmod: blog.sys.createdAt,
  }));

//   console.log(fieldss);

  return getServerSideSitemap(ctx, fieldss);
}

export default function Site() {}
