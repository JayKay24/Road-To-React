import React, { useState, useEffect, useRef, useReducer } from 'react';
import { STORIES_ACTIONS } from './actions';

const initialStories = [
  {
    title: 'React',
    url: 'http://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  const { STORIES_FETCH_INIT, STORIES_FETCH_FAILURE, STORIES_FETCH_SUCCESS, REMOVE_STORY } =
    STORIES_ACTIONS;
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case STORIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case STORIES_FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case REMOVE_STORY: {
      const {
        payload: { objectID },
      } = action;
      return { ...state, data: state.data.filter((story) => story.objectID !== objectID) };
    }
    default:
      throw new Error();
  }
};

const getAsyncStories = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: {
            stories: initialStories,
          },
        }),
      2000,
    );
  });

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

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

const InputWithLabel = ({ value, onInputChange, id, children, isFocused, type = 'text' }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} onChange={onInputChange} value={value} ref={inputRef} />
    </>
  );
};

export default App;
