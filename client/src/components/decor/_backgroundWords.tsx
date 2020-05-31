import styled from "styled-components";
import { blueColor } from "@constants";

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
  font-size: 36px;
  line-height: 45px;
  color: #ffffff;
  -webkit-text-stroke: .5px;
  -webkit-text-stroke-color: ${blueColor["1000"]};
`;
