import React, { useEffect, useReducer, useCallback, useState, useMemo } from 'react';
import axios from 'axios';

import { useSemiPersistentState } from './hooks/useSemiPersistentState';

import { STORIES_ACTIONS } from './store/actions';
import { storiesReducer } from './store/reducers';
import { initialState } from './store/initialState';

import { List } from './components/List';
import { SearchForm } from './components/SearchForm';

import { StyledContainer } from './components/styled/StyledContainer';
import { StyledHeadlinePrimary } from './components/styled/StyledHeadlinePrimary';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const getSumComments = (stories) => {
  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};

const App = () => {
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_INIT });
    try {
      const {
        data: { hits },
      } = await axios.get(url);

      dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_SUCCESS, payload: hits });
    } catch (error) {
      dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_FAILURE });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = useCallback((item) => {
    dispatchStories({ type: STORIES_ACTIONS.REMOVE_STORY, payload: item });
  }, []);

  const handleSearchInput = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm],
  );

  const handleSearchSubmit = useCallback(
    (event) => {
      setUrl(`${API_ENDPOINT}${searchTerm}`);
      event.preventDefault();
    },
    [searchTerm],
  );

  const sumComments = useMemo(() => getSumComments(stories), [stories]);

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker stories with {sumComments} comments.</StyledHeadlinePrimary>

      <SearchForm
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSearchInput={handleSearchInput}
      />

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};

export default App;
