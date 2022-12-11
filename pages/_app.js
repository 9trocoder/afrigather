/* eslint-disable @next/next/inline-script-id */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import * as gtag from "../lib/gtag";
import Head from "next/head";
import { NextSeo } from "next-seo";

const url = "https://www.afritrump.com/";
const title = "Afritrump News";
const description =
  "Afritrump is your one number news blog for real-time premium news stories. We deliver news daily to you.";

const imageda = "https://i.ibb.co/GQ4mCc2/android-chrome-512x512.png";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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
          content="Afritrump is your one number news blog for real-time premium news stories. We deliver live events as they happen arround Africa and the world."
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
          s src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4745428687293641"
          crossorigin="anonymous"></script>
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

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <div className="thecontainer">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}

export default MyApp;
