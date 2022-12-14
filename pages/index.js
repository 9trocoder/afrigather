/* eslint-disable @next/next/inline-script-id */
/* eslint-disable react/no-unescaped-entities */
import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import Link from "next/dist/client/link";
import { NextSeo } from "next-seo";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import * as gtag from "../lib/gtag";
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
const imageda = "https://i.ibb.co/GQ4mCc2/android-chrome-512x512.png";

export default function Home({ blogs }) {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content="https://i.ibb.co/GQ4mCc2/android-chrome-512x512.png"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Teaching" />
        <meta property="og:url" content="https://afritrump.com/" />
        <meta
          property="og:description"
          content="Afritrump is your one number news Blog for real-time premium news stories. We deliver live events as they happen arround Africa and the world."
        />
        <link rel="canonical" href="/" />
        <meta
          name="Afritrump"
          content="Afritrump is your one number news blog for real-time premium news stories. We deliver live events as they happen arround Africa and the world."
        />
        <meta
          name="google-site-verification"
          content="rXoaV__VaP0MRsn0me2EVThs9iLl0dAhnJHgQUj7SPM"
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4745428687293641"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {/* <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5365461,document.body||document.documentElement)
          `,
        }}
      /> */}
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
              url: imageda,
            },
          ],
          site_name: "AfriTrump",
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      {/* <Script
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
      /> */}
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
