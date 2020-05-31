import styled from "styled-components";
import { blueColor } from "@constants";
import { BaseButton } from "@components";
import { ButtonThemes } from "@interfaces";

interface ErrorPageProps {
  status: number;
  word?: string;
}

export default function ErrorPage({ status }: ErrorPageProps) {
  if (status === 404) {
    return (
      <$Container>
        <$Title>Я в ахуе, такого слова нет</$Title>
        <BaseButton theme={ButtonThemes.PRIMARY} onClick={() => {}}>
          Предложить слово
        </BaseButton>
      </$Container>
    );
  }

  return (
    <$Container>
      <$Title>Not found</$Title>
    </$Container>
  );
}

const $Container = styled.div`
  width: 100%;
  height: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const $Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: ${blueColor["900"]};
  margin-bottom: 20px;
`;
