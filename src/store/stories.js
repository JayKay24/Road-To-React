export const initialStories = [
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

export const getAsyncStories = () =>
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
