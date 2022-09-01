import { createClient } from "contentful";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { NextSeo } from "next-seo";
import dimage from "../../public/android-chrome-512x512.png";

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
const title = "Afritrump Blogs";
const description =
  "Here in Afritrump We deliver live events as they happen arround Africa and the world.";
  const imageda = "https://i.ibb.co/GQ4mCc2/android-chrome-512x512.png";


export default function Blog({ blogs }) {
  const [incre, setIcre] = useState(5);
  const [shownext, setShowNext] = useState(true);
  const [showprev, setShowPrev] = useState(false);

  console.log(blogs.length);

  useEffect(() => {
    if (incre === blogs.length) {
      setShowNext(false);
    } else if (incre > blogs.length) {
      setShowNext(false);
    }

    if (incre === 5) {
      setShowPrev(false);
    }
  }, [incre, blogs.length]);

  const handleNext = () => {
    if (incre === blogs.length) {
      setShowNext(false);
      setIcre(incre--);
    } else if (blogs.length > 5) {
      if (blogs.length > 5) {
        setShowPrev(true);
      } else {
        setShowPrev(false);
      }
    } else {
      setShowNext(true);
    }
    setIcre((incre = incre + 5));
  };

  const handlePrevious = () => {
    setIcre((incre = incre - 5));
    setShowNext(true);
  };

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
        <meta property="og:url" content="https://afritrump.com/blogs" />
        <meta
          property="og:description"
          content="Here in Afritrump, We deliver live events as they happen arround Africa and the world."
        />
        <link rel="canonical" href="/" />
        <meta
          name="Afritrump"
          content="Here in Afritrump, We deliver live events as they happen arround Africa and the world."
        />
        <meta
          name="google-site-verification"
          content="UzGrXflIUP7j4fCvSUYsiYT4UK920F4umosRxElAcAU"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9197029786441774"
          crossOrigin="anonymous"
        ></script>
      </Head>
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

      <div className={styles.blogscra}>
        {blogs.slice(0, incre).map((blog, key) => (
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
      <div className={styles.thebuttons}>
        {showprev && <button onClick={() => handlePrevious()}>Previous</button>}
        {shownext && <button onClick={() => handleNext()}>Next</button>}
      </div>
    </>
  );
}
