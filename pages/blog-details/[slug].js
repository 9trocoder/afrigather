import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blog: items[0],
      bloglists: res.items,
    },
    revalidate: 1,
  };
}

export default function BlogDetails({ blog, bloglists }) {
  if (!blog) return <Skeleton />;
  const { featuredImage, title, authors, method, date } = blog.fields;

  return (
    <div>
      <h1>{title}</h1>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={500}
        alt="featured image"
      />

      <div>{documentToReactComponents(method)}</div>
    </div>
  );
}
