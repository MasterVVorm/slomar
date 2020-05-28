import { AppProps } from "next/app";
import { Fragment } from "react";
import { Navbar } from "@components";
import { createGlobalStyle } from "styled-components";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <$GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </Fragment>
  );
}

const $GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/latohairline.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/latoregular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/latoitalic.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/latomedium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Russia';
    src: url('/assets/fonts/russia-01.ttf');
    font-weight: 500;
    font-style: normal;
  }

  *{
    margin: 0;
    padding: 0;
  }

  html, body{
    width: 100%;
    font-family: Lato, sans-serif;
  }

`;
