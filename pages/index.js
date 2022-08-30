import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import Link from "next/dist/client/link";
import { NextSeo } from "next-seo";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import dimage from "../public/android-chrome-512x512.png";

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

const url = "https://www.afritrump.com/blogs";
const title = "Blog - Afritrump";
const description =
  "Afritrump is your one number news blog for real-time premium news stories. We deliver live events as they happen arround Africa and the world.";

export default function Home({ blogs }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: dimage,
            },
          ],
          site_name: "AfriTrump",
        }}
      />
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_ID}`}
        crossOrigin="anonymous"
      />

      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: ${process.env.ADSENSE_ID},
            enable_page_level_ads: true
       });
          `,
        }}
      />
      <main className={styles.hometop}>
        <div className={styles.main_left}>
          {blogs.slice(0, 1).map((blog, key) => (
            <div key={key}>
              <Image
                src={"https:" + blog.fields.thumbnail.fields.file.url}
                width={blog.fields.thumbnail.fields.file.details.image.width}
                height={500}
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
        <div className={styles.main_right}>
          {blogs.slice(1, 3).map((blog, key) => (
            <div key={key}>
              <Image
                src={"https:" + blog.fields.thumbnail.fields.file.url}
                width={blog.fields.thumbnail.fields.file.details.image.width}
                height={500}
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
      </main>
      <main>
        <div className={styles.todaytrend}>
          <h1>{"TODAY'S"} TRENDING NEWS</h1>
          <Link href="/blogs">View all</Link>
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
        <div className={styles.todaytrend}>
          <h1>THE LATEST ARTICLES</h1>
          <Link href="/blogs">View all</Link>
        </div>
        <div className={styles.main_middle_bottom}>
          {blogs.slice(1, 12).map((blog, key) => (
            <div key={key} className={styles.main_middlebottom_split}>
              <div className={styles.mmbsimage}>
                <Image
                  src={"https:" + blog.fields.thumbnail.fields.file.url}
                  width={blog.fields.thumbnail.fields.file.details.image.width}
                  height={500}
                  alt={blog.fields.title}
                />
              </div>

              <div className={styles.main_middle_split}>
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
                </div>
                <h1 className={styles.hometitle}>{blog.fields.title}</h1>
                <p className={styles.homeparagraph}>{blog.fields.subTItle}</p>
                <div className={styles.thebottompart}>
                  <div className={styles.dauthor}>
                    <div className={styles.authodash} />
                    <p>{blog.fields.authors[0]}</p>
                  </div>
                  <div className={styles.readmorebtnn}>
                    <Link href={"/blog-details/" + blog.fields.slug}>
                      <a>Read now</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
