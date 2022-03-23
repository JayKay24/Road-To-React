import React, { useEffect, useReducer, useCallback, useState } from 'react';
import axios from 'axios';

import { useSemiPersistentState } from './hooks/useSemiPersistentState';

import { STORIES_ACTIONS } from './store/actions';
import { storiesReducer } from './store/reducers';
import { initialState } from './store/initialState';

import { InputWithLabel } from './components/InputWithLabel';
import { List } from './components/List';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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

  const handleRemoveStory = (item) => {
    dispatchStories({ type: STORIES_ACTIONS.REMOVE_STORY, payload: item });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <h1>My Hacker stories</h1>

      <InputWithLabel value={searchTerm} onInputChange={handleSearchInput} id="search" isFocused>
        <strong>Search:</strong>
      </InputWithLabel>

      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
