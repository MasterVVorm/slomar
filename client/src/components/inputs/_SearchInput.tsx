import styled from "styled-components";
import { grayColor, blueColor, dimens } from "@constants";
import { SearchButton } from "@components";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface SearchInputProps {
  placeholder?: string;
}

interface ResultProps {
  id: string;
  name: string;
}

interface SearchResultsProps {
  results: Array<ResultProps>;
}

const SEARCH_FOR_WORD = gql`
  query searchForWord($word: String!) {
    search(word: $word) {
      id
      name
    }
  }
`;

const SearchResults = ({ results }: SearchResultsProps) => (
  <$SearchResults>
    {results.map((result) => (
      <Link key={result.id} href={`word/${result.name}`} passHref>
        <$SearchResult>{result.name}</$SearchResult>
      </Link>
    ))}
  </$SearchResults>
);

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const { loading, data, error } = useQuery(SEARCH_FOR_WORD, {
    variables: { word: inputValue },
  });
  const showResults = useMemo(
    () => !!inputValue.length && inputFocused && !loading && !error,
    [inputValue, inputFocused, loading, data, error]
  );

  console.log("DATA: ", data);

  const clickHandler = () => {};

  return (
    <$Container>
      <$Input
        type={"text"}
        placeholder={placeholder}
        value={inputValue}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onChange={({ target }) => setInputValue(target.value)}
      />
      <SearchButton active={false} onClick={clickHandler} />
      {/* <$Data>{data}</$Data> */}
      {showResults && <SearchResults results={data.search} />}
    </$Container>
  );
};

const $Data = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  padding: 20px;
`;

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

const $SearchResults = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  display: block;
  width: 400px;
  max-height: 150px;
  background: white;
  overflow-y: auto;
  box-shadow: 0px 0px 8px rgba(50, 69, 103, 0.15);
`;

const $SearchResult = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  height: 30px;
  text-decoration: none;
  font-size: 14px;
  color: ${blueColor["900"]};
  transition: ${dimens.transition};

  &:hover {
    background-color: ${blueColor["300"]};
    color: ${grayColor["100"]};
  }

  &:active {
    background-color: ${blueColor["500"]};
    color: ${grayColor["100"]};
  }
`;
