import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import Link from "next/dist/client/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <>
      <Head>
        <title>Afri-Gather</title>
        <meta
          name="description"
          content="This is the place to find the critic news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.hometop}>
        <div className={styles.main_left}>
          {blogs.slice(0, 1).map((blog, key) => (
            <div key={key}>
              <Image
                src={"https:" + blog.fields.thumbnail.fields.file.url}
                width={blog.fields.thumbnail.fields.file.details.image.width}
                height={blog.fields.thumbnail.fields.file.details.image.height}
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
                  <p>5 min read</p>
                </div>
                <div className={styles.dauthor}>
                  <div className={styles.authodash} />
                  <p>{blog.fields.authors[0]}</p>
                </div>
              </div>

              <h1 className={styles.hometitle}>{blog.fields.title}</h1>
              <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
            </div>
          ))}
        </div>
        <div className={styles.main_right}>
          {blogs.slice(1, 3).map((blog, key) => (
            <div key={key}>
              <Image
                src={"https:" + blog.fields.thumbnail.fields.file.url}
                width={blog.fields.thumbnail.fields.file.details.image.width}
                height={300}
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
                  <p>5 min read</p>
                </div>
                <div className={styles.dauthor}>
                  <div className={styles.authodash} />
                  <p>{blog.fields.authors[0]}</p>
                </div>
              </div>
              <h1 className={styles.hometitle}>{blog.fields.title}</h1>
              <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
            </div>
          ))}
        </div>
      </main>
      <main>
        <div className={styles.todaytrend}>
          <h1>{"TODAY'S"} TRENDING NEWS</h1>
          <Link href="/">View all</Link>
        </div>
        <div className={styles.main_middle}>
          {blogs.slice(3, 6).map((blog, key) => (
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
                  <p>5 min read</p>
                </div>
                <div className={styles.dauthor}>
                  <div className={styles.authodash} />
                  <p>{blog.fields.authors[0]}</p>
                </div>
              </div>
              <h1 className={styles.hometitle}>{blog.fields.title}</h1>
              <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
            </div>
          ))}
        </div>
        <div className={styles.todaytrend}>
          <h1>THE LATEST ARTICLES</h1>
          <Link href="/">View all</Link>
        </div>
        <div className={styles.main_middle_bottom}>
          {blogs.slice(3, 6).map((blog, key) => (
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
                  <p>5 min read</p>
                </div>
                <div className={styles.dauthor}>
                  <div className={styles.authodash} />
                  <p>{blog.fields.authors[0]}</p>
                </div>
              </div>
              <h1 className={styles.hometitle}>{blog.fields.title}</h1>
              <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
