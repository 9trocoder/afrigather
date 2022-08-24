import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";
import Link from "next/dist/client/link";
import Skeleton from "../../components/Skeleton";
import styles from "../../styles/detailslug.module.css";

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
      blogs: res.items,
    },
    revalidate: 1,
  };
}

export default function BlogDetails({ blog, blogs }) {
  if (!blog) return <Skeleton />;
  const { featuredImage, title, authors, method, date } = blog.fields;

  return (
    <div className={styles.blogdetailsbody}>
      <div className={styles.blogdetailsleft}>
        <h1>{title}</h1>
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={500}
          alt="featured image"
        />
        <div className={styles.splititblog}>
          <div className={styles.datetimeread}>
            <p>
              {new Date(date).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>5 min read</p>
          </div>
          <div className={styles.dauthor}>
            <p>{authors[0]}</p>
          </div>
        </div>

        <div>{documentToReactComponents(method)}</div>
      </div>
      <div className={styles.blogdetailsright}>
        <h1 className={styles.denalsolike}>People Also read this</h1>
        <div className={styles.splititna}>
          {blogs.slice(6, 8).map((blog, key) => (
            <div key={key}>
              <Image
                src={"https:" + blog.fields.thumbnail.fields.file.url}
                width={blog.fields.thumbnail.fields.file.details.image.width}
                height={400}
                alt={blog.fields.title}
              />
              <div className={styles.splititblog}>
                <div className={styles.datetimeread}>
                  <p>
                    {new Date(blog.fields.date).toLocaleString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className={styles.dauthor}>
                  <p>{blog.fields.authors[0]}</p>
                </div>
              </div>
              <h1 className={styles.hometitle}>{blog.fields.title}</h1>
              <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
              <div className={styles.readmorebtn}>
                <Link href={"/blog-details/" + blog.fields.slug}>
                  <a>Read now</a>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link href="/">
          <p className={styles.blogslugereadl}>View All</p>
        </Link>
      </div>
    </div>
  );
}
