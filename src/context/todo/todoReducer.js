import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  REMOVE_TODO,
  HIDE_LOADER,
  SHOW_LOADER,
  UPDATE_TODO,
  SHOW_ERROR,
} from '../types';

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((item) => (item.id !== id ? item : { id, title })),
  }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  [FETCH_TODOS]: (state, { payload }) => ({ ...state, todos: payload }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
