import Head from "next/head";
import styled from "styled-components";

import { SearchInput } from "@components";
import { blueColor } from "@constants";

export default function MainPage() {
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
    </$Container>
  );
}

const $Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const $Title = styled.div`
  font-family: "Russia";
  font-size: 48px;
  text-align: center;
  color: ${blueColor["900"]};
  margin-top: 110px;
  margin-bottom: 100px;
`;
