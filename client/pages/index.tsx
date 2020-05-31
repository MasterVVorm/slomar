import Head from "next/head";
import styled from "styled-components";

import { SearchInput, BackgroundWords } from "@components";
import { blueColor, APOLLO_URL, grayColor } from "@constants";
import request from "graphql-request";
import { TomObject } from "@interfaces";

interface MainPageProps {
  toms: Array<TomObject>;
}

const GET_TOMS = `
query getToms{
  toms{
    id,
    name,
    words_amount
  }
}
`;

const Tom = ({id, name, description = "Заглушка", words_amount }: TomObject) => (
  <$TomContainer>
    <$TomTitle>ТОМ {id}</$TomTitle>
    <$TomDescription>{description}</$TomDescription>
    <$TomWordsAmount>{words_amount}</$TomWordsAmount>
  </$TomContainer>
);

export default function MainPage({ toms }: MainPageProps) {
  console.log(toms);
  return (
    <$Container>
      <Head>
        <title>Сломарь</title>
      </Head>
      <$Title>
        ПЕРВЫЙ СЛОВАРЬ СИННОНИМОВ И МЕТАФОР
        <br />
        ОБСЦЕННОЙ ТРИАДЫ РУССКОГО ЯЗЫКА
      </$Title>
      <SearchInput placeholder={"Спорим, что ты не сможешь придумать новый?"} />
      <$Toms>
        {toms.map((tom) => (
          <Tom key={tom.id} {...tom} />
        ))}
      </$Toms>

      <BackgroundWords />
    </$Container>
  );
}

export async function getServerSideProps(context) {
  const toms = await request(APOLLO_URL, GET_TOMS);

  return {
    props: {
      toms: toms.toms,
    },
  };
}

const $Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const $Title = styled.div`
  font-family: "Russia";
  font-size: 48px;
  text-align: center;
  color: ${blueColor["900"]};
`;

const $Toms = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

const $TomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 65px 0 65px;
  cursor: pointer;
`;

const $TomTitle = styled.div`
  font-family: "Russia";
  font-size: 24px;
  text-decoration: underline;
  color: ${blueColor["1100"]};
`;

const $TomDescription = styled.div`
  font-style: italic;
  font-size: 10px;
  color: ${grayColor["600"]};
  margin-top: 8px;
`;

const $TomWordsAmount = styled.div`
  font-family: "Russia";
  font-size: 24px;
  color: ${blueColor["1100"]};
  margin-top: 5px;
`;
