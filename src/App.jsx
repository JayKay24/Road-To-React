import React, { useEffect, useReducer } from 'react';

import { useSemiPersistentState } from './hooks/useSemiPersistentState';

import { STORIES_ACTIONS } from './store/actions';
import { storiesReducer } from './store/reducers';
import { getAsyncStories } from './store/stories';

import { InputWithLabel } from './components/InputWithLabel';
import { List } from './components/List';

const App = () => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  useEffect(() => {
    async function fetchStories() {
      dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_INIT });
      try {
        const {
          data: { stories },
        } = await getAsyncStories();
        dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_SUCCESS, payload: stories });
      } catch (error) {
        dispatchStories({ type: STORIES_ACTIONS.STORIES_FETCH_FAILURE });
      }
    }

    fetchStories();
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({ type: STORIES_ACTIONS.REMOVE_STORY, payload: item });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1>My Hacker stories</h1>

      <InputWithLabel value={searchTerm} onInputChange={handleSearch} id="search" isFocused>
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
