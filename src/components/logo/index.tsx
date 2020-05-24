import styled from "styled-components";

export const Logo = () => <$Container></$Container>;

const $Container = styled.div`
  position: relative;
  width: 81px;
  height: 29px;
  background-image: url("/assets/images/logo.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  margin-left: 15px;
`;
