import { AppProps } from "next/app";
import { Fragment } from "react";
import { Navbar } from "@components";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "@lib";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
        <$GlobalStyle />
        <Navbar />
        <Component {...pageProps} />
    </ApolloProvider>
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
    box-sizing: border-box;
  }

  html, body{
    width: 100%;
    height: 100vh;
    font-family: Lato, sans-serif;
  }

  #__next{
    width: 100%;
    height: 100%;
  }

`;
