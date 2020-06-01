import styled from "styled-components";
import { blueColor, screenSize } from "@constants";

export const BackgroundWords = () => (
  <$Container>
    <$Word>ХУЙ</$Word>
    <$Word>ПИЗДА</$Word>
  </$Container>
);

const $Container = styled.div`
  position: fixed;
  bottom: 10vh;
  left: -10px;
  width: calc(100vw + 30px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const $Word = styled.div`
  font-family: Russia;
  
  color: #ffffff;
  -webkit-text-stroke: .5px;
  -webkit-text-stroke-color: ${blueColor["1000"]};

  @media screen and (min-width: ${screenSize.PC}) {
    font-size: 46px;
  line-height: 46px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    font-size: 36px;
  line-height: 45px;
  }
`;
