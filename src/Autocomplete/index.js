import { useState } from "react";
import styled from "styled-components";
import { useFuse } from "./useFuse";

const AutocompleteContainer = styled.div`
  width: 450px;
  margin: 0 auto;
`;

const SuggestionsContainer = styled.div`
  position: relative;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  width: 100%;
  border: 2px solid gainsboro;
  border-radius: 4px;
  margin-top: 2px;
  box-sizing: border-box;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem;
  border: 2px solid gainsboro;
  border-radius: 4px;
  font-size: 1.2rem;
  z-index: 10;
  background: transparent;

  &:focus {
    outline: none;
    border-color: lightblue;
    box-shadow: 0 0 4px lightblue;
  }
`;

const List = styled.ol`
  list-style: none;
  text-align: start;
  font-size: 1.1rem;
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  padding: 1.1rem;
  transition: all 250ms ease-in-out;
  &:hover {
    background: #cccccc;
  }
`;

const MatchShadow = styled.div`
  position: absolute;
  border: 2px solid transparent;
  padding: 1.1rem;
  border-radius: 4px;
  font-size: 1.2rem;
  color: #cccccc;
  z-index: -1;
  user-select: none;
  background: transparent;
  top: 0;
`;

export const Autocomplete = () => {
  const [searchTerm, setText] = useState("");
  const [searchHistory, setHistory] = useState([]);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const set = new Set([...searchHistory, searchTerm]);
    setHistory([...set]);
  };
  const suggestions = useFuse(searchTerm, searchHistory);
  return (
    <AutocompleteContainer>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <Input
          type="search"
          value={searchTerm}
          onChange={(ev) => setText(ev.target.value)}
          placeholder="eg. Mazda, Toyota, Porshe"
        />
        <MatchShadow>
          {suggestions.length > 0 &&
            suggestions[0].includes(searchTerm) &&
            suggestions[0]}
        </MatchShadow>
      </form>
      {/* suggestions list */}
      <SuggestionsContainer>
        <SuggestionsDropdown
          show={searchTerm.length > 0 && suggestions.length > 0}
        >
          <List>
            {suggestions.map((search) => (
              <SuggestionItem key={search}>{search}</SuggestionItem>
            ))}
          </List>
        </SuggestionsDropdown>
      </SuggestionsContainer>
    </AutocompleteContainer>
  );
};
