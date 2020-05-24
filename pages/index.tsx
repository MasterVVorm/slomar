import Head from "next/head";
import styled from "styled-components";
import { blueColor } from "@constants";

export default function MainPage() {
  return (
    <$Container>
      <Head>
        <title>Сломарь</title>
      </Head>
      <$Title>
        ПЕРВЫЙ СЛОВАРЬ СИННОНИМОВ И МЕТАФОР<br/>ОБСЦЕННОЙ ТРИАДЫ РУССКОГО ЯЗЫКА
      </$Title>
    </$Container>
  );
}

const $Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
`;

const $Title = styled.div`
  font-family: 'Russia';
  font-size: 48px;
  text-align: center;
  color: ${blueColor['900']};
  margin-top: 110px;
`;
