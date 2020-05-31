import styled from "styled-components";
import { request } from "graphql-request";

import { dimens, APOLLO_URL } from "@constants";
import { GetStaticPropsContext } from "next";
import { WordObject } from "@interfaces";
import ErrorPage from "pages/error";

interface WordPageProps {
  word: WordObject | null;
}

const GET_WORD = (word: string) => `
  {
    word(name: "${word}") {
      id,
      name,
      tom{
        id,
        name
      },
      meanings{
        id,
        text,
        example
      }
    }
  }
`;

const GET_WORDS = `
  {
    words(take: 500){
      name
    }
  }
`;

export default function WordPage({ word }: WordPageProps) {
  if (!word) {
    return <ErrorPage status={404} />;
  }

  return (
    <$Container>
      <$WordName>{word.name}</$WordName>
    </$Container>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const result = await request(APOLLO_URL, GET_WORD(context.params.id as any));

  return {
    props: { word: result.word },
  };
}

export async function getStaticPaths() {
  const result = await request(APOLLO_URL, GET_WORDS);

  return {
    paths: result.words.map((res) => ({ params: { id: res.name } })),
    fallback: true,
  };
}

const $Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: ${dimens.navbarHeight};
`;

const $WordName = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;
