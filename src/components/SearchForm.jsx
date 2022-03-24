import React from 'react';

import { InputWithLabel } from './InputWithLabel';

import { StyledSearchForm } from './styled/StyledSearchForm';
import { StyledButtonLarge } from './styled/StyledButtonLarge';

export const SearchForm = ({ searchTerm, onSearchSubmit, onSearchInput }) => (
  <StyledSearchForm onSubmit={onSearchSubmit}>
    <InputWithLabel value={searchTerm} onInputChange={onSearchInput} id="search" isFocused>
      <strong>Search:</strong>
    </InputWithLabel>

    <StyledButtonLarge type="submit" disabled={!searchTerm}>
      Submit
    </StyledButtonLarge>
  </StyledSearchForm>
);
