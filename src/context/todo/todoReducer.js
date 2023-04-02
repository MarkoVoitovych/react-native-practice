import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';

const handlers = {
  [ADD_TODO]: (state, { title }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        title,
      },
    ],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((item) => (item.id !== id ? item : { id, title })),
  }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
