import styled from "styled-components";
import { request } from "graphql-request";

import { dimens, APOLLO_URL, grayColor, blueColor, screenSize } from "@constants";
import { GetStaticPropsContext } from "next";
import { WordObject } from "@interfaces";
import ErrorPage from "pages/error";
import { Fragment } from "react";
import Head from "next/head";

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

  const name =
    word.name[0].toUpperCase() + word.name.substring(1, word.name.length);

  return (
    <Fragment>
      <Head>
        <title>Сломарь | {word.name}</title>
      </Head>
      <$Container>
        <$WordName>{name}</$WordName>
        {word.meanings.map((meaning) => (
          <$Meaning>
            <$Row>
              <$RowTitle>Значение:</$RowTitle>
              <$MeaningText>{meaning.text}</$MeaningText>
            </$Row>
            <$Row>
              <$RowTitle>Пример: </$RowTitle>
              <$MeaningExample> {meaning.example}</$MeaningExample>
            </$Row>
          </$Meaning>
        ))}
        <$Venya />
      </$Container>
    </Fragment>
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
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 148px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const $WordName = styled.h1`
  position: relative;
  font-family: PT Serif;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: ${blueColor["900"]};

  @media screen and (min-width: ${screenSize.PC}) {
    font-size: 36px; 
  }
`;

const $Meaning = styled.div`
  width: 80%;
  max-width: 1000px;
  border-top: 1px solid ${grayColor["300"]};
  border-bottom: 1px solid ${grayColor["300"]};
  padding: 18px 28px 18px 28px;
  margin-top: 46px;

  &:first-child {
    margin-top: 46px;
  }
`;

const $Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const $RowTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
`;

const $MeaningText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;

const $MeaningExample = styled.div`
  font-size: 14px;
  font-style: italic;
  margin-left: 5px;
`;

const $Venya = styled.div`
  width: 400px;
  height: 400px;
  background-image: url("/assets/images/ven/word_illustration.png");
  background-size: cover;
`;
