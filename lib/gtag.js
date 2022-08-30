export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

export const pageView = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  windows.gtag("event", action, {
    event_category: category,
    event_lable: label,
    value: value,
  });
};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDtZptUL_Rw92lki6kCqV_HIXtpRQP9esg",
//   authDomain: "afritrump.firebaseapp.com",
//   projectId: "afritrump",
//   storageBucket: "afritrump.appspot.com",
//   messagingSenderId: "779880349259",
//   appId: "1:779880349259:web:89a6987f5d1e34e8fd57ce",
//   measurementId: "G-YRFM55ZGRQ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);