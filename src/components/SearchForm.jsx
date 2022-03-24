import React from 'react';

import { InputWithLabel } from './InputWithLabel';

export const SearchForm = ({ searchTerm, onSearchSubmit, onSearchInput }) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel value={searchTerm} onInputChange={onSearchInput} id="search" isFocused>
      <strong>Search:</strong>
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);
