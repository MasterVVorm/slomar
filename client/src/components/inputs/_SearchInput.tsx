import styled from "styled-components";
import { grayColor, blueColor } from "@constants";
import { SearchButton } from "@components";

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const clickHandler = () => {};

  return (
    <$Container>
      <$Input type={"text"} placeholder={placeholder} />
      <SearchButton active={false} onClick={clickHandler} />
    </$Container>
  );
};

const $Container = styled.div`
  position: relative;
  width: 400px;
  height: 35px;
  box-shadow: 0 0 0 1px ${grayColor["200"]};
  display: flex;
`;

const $Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px 0 10px;
  font-style: italic;
  color: ${blueColor["600"]};
`;
