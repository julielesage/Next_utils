// This App component is the top-level component which will be common across all the different pages. 
// You can use this App component to keep state when navigating between pages, for example.
// You need to restart the development server when you add pages/_app.js.
//  global CSS can't be imported outside of pages/_app.js


//Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. 
//Pre-rendering can result in better performance and SEO. Each generated HTML is associated with minimal JavaScript code necessary for that page. 
//When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. 
// (This process is called hydration.)

//install gray-matter which lets us parse the metadata in each markdown file.
//Pages that begin with [ and end with ] are dynamic routes in Next.js.

import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}