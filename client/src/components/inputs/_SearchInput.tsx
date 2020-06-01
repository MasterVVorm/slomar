import styled from "styled-components";
import { grayColor, blueColor, dimens, screenSize } from "@constants";
import { SearchButton } from "@components";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { InputProps } from "@interfaces";

interface ResultProps {
  id: string;
  name: string;
}

interface SearchResultsProps {
  show: boolean;
  word: string;
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

const SearchResults = ({ show, results, word }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <$SearchResults show={show}>
        <Link href={`addWord/${word}`}>
          <$AddWord>
            Похоже, что такого слова еще нет. Жми чтоб добавить, еба
          </$AddWord>
        </Link>
      </$SearchResults>
    );
  }
  return (
    <$SearchResults show={show}>
      {results.map((result) => (
        <Link key={result.id} href={`word/[id]`} as={`word/${result.name}`}>
          <$SearchResult>{result.name}</$SearchResult>
        </Link>
      ))}
    </$SearchResults>
  );
};

export const SearchInput = ({ placeholder }: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const { loading, data, error } = useQuery(SEARCH_FOR_WORD, {
    variables: { word: inputValue },
    pollInterval: 1000,
  });

  const showResults = useMemo(
    () => !!inputValue.length && inputFocused && !loading && !error,
    [inputValue, inputFocused, loading, data, error]
  );

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
      {!loading && !error && (
        <SearchResults
          show={showResults}
          results={data.search}
          word={inputValue}
        />
      )}
    </$Container>
  );
};

const $Container = styled.div`
  position: relative;
  width: 400px;
  height: 35px;
  box-shadow: 0 0 0 1px ${grayColor["200"]};
  display: flex;

  @media screen and (min-width: ${screenSize.PC}) {
    width: 500px;
    height: 45px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    width: 400px;
    height: 35px;
  }
`;

const $Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px 0 10px;
  font-style: italic;
  color: ${blueColor["900"]};

  @media screen and (min-width: ${screenSize.PC}) {
    font-size: 16px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    font-size: 14px;
  }

  &::placeholder {
    color: ${blueColor["600"]};
  }
`;

const $SearchResults = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  display: block;

  background: white;
  overflow-y: auto;
  box-shadow: 0px 0px 8px rgba(50, 69, 103, 0.15);
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: ${dimens.transition};
  transition-delay: 0.1s;

  @media screen and (min-width: ${screenSize.PC}) {
    width: 500px;
    max-height: 200px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    width: 400px;
    max-height: 150px;
  }
`;

const $SearchResult = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  text-decoration: none;
  color: ${blueColor["1100"]};
  transition: ${dimens.transition};
  cursor: pointer;

  @media screen and (min-width: ${screenSize.PC}) {
    font-size: 16px;
    height: 40px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    font-size: 14px;
    height: 30px;
  }

  &:hover {
    background-color: ${blueColor["300"]};
    color: ${grayColor["100"]};
  }

  &:active {
    background-color: ${blueColor["500"]};
    color: ${grayColor["100"]};
  }
`;

const $AddWord = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${blueColor["900"]};
  text-decoration: none;
  cursor: pointer;

  @media screen and (min-width: ${screenSize.PC}) {
    font-size: 16px;
    height: 40px;
  }

  @media screen and (max-width: ${screenSize.PC}) {
    font-size: 14px;
    height: 30px;
  }

  &:hover {
    background-color: ${blueColor["300"]};
    color: ${grayColor["100"]};
  }

  &:active {
    background-color: ${blueColor["500"]};
    color: ${grayColor["100"]};
  }
`;
