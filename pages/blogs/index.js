import { createClient } from "contentful";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

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

export default function Blog({ blogs }) {
  const [incre, setIcre] = useState(6);
  const [shownext, setShowNext] = useState(true);
  const [showprev, setShowPrev] = useState(false);

  useEffect(() => {
    if (incre === blogs.length) {
      setShowNext(false);
    }

    if (incre === 6) {
      setShowPrev(false);
    }
  }, [incre, blogs.length]);


  const handleNext = () => {
    if (incre === blogs.length) {
      setShowNext(false);
      setIcre(incre--);
    } else if (blogs.length > 6) {
      if (blogs.length > 6) {
        setShowPrev(true);
      } else {
        setShowPrev(false);
      }
    } else {
      setShowNext(true);
    }
    setIcre((incre = incre + 1));
  };

  const handlePrevious = () => {
    setIcre((incre = incre - 1));
    setShowNext(true);
  };

  return (
    <>
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
