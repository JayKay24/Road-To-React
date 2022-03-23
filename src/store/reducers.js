import { STORIES_ACTIONS } from './actions';

export const storiesReducer = (state, action) => {
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
