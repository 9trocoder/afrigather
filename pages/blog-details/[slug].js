import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";
import Link from "next/dist/client/link";
import Skeleton from "../../components/Skeleton";
import { NextSeo } from "next-seo";
import styles from "../../styles/detailslug.module.css";
import Script from "next/script";
import Head from "next/head";
import * as gtag from "../../lib/gtag";

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
  const { featuredImage, title, authors, method, date, subTItle, slug } =
    blog.fields;
  const url = `https://www.afritrump.com/blog-details/${slug}`;

  const slugimage = `https:${featuredImage.fields.file.url}`;

  return (
    <>
      <Head>
      <meta name="propeller" content="be242d24b3f57b1843b2f3acf35526a1" />
        <meta property="og:image" content={slugimage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Teaching" />
        <meta property="og:url" content={`https://afritrump/blog-details/${slug}`} />
        <meta property="og:description" content={subTItle} />
        <link rel="canonical" href={`/blog-details/${slug}`} />
        <meta name={title} content={subTItle} />
        <meta
          name="google-site-verification"
          content="rXoaV__VaP0MRsn0me2EVThs9iLl0dAhnJHgQUj7SPM"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9197029786441774"
          crossOrigin="anonymous"
        ></script>
        <script type="text/javascript">(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5365461,document.body||document.documentElement)
        </script>
        <script>
          (function(s,u,z,p) [ s.src=u, s.setAttribute( "data-zone", z ),
          p.appendChild(s) ]) ( document.createElement('script'),
          'https://inklinkor.com/tag.min.js', 5365461,
          document.body||document.documentElement )
        </script>
      </Head>
      <NextSeo
        title={title}
        description={subTItle}
        canonical={url}
        openGraph={{
          url,
          title,
          description: subTItle,
          images: [
            {
              url: slugimage,
            },
          ],
          site_name: "AfriTrump",
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      {/* 
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: ${processs.env.ADSENSE_ID},
            enable_page_level_ads: true
       });
          `,
        }}
      /> */}

      <div className={styles.blogdetailsbody}>
        <div className={styles.blogdetailsleft}>
          <h1>{title}</h1>
          <Image
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={600}
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

          <div className={styles.methodstyles}>
            {documentToReactComponents(method)}
          </div>
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

          <Link href="/blogs">
            <p className={styles.blogslugereadl}>View All</p>
          </Link>
        </div>
      </div>
    </>
  );
}
