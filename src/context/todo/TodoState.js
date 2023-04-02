import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { ScreenContext } from '../screen/screenContext';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

const initialState = {
  todos: [{ id: '1', title: 'Learn React Native' }],
};

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = (title) => dispatch({ type: 'ADD_TODO', title });
  const removeTodo = (id) => {
    const todo = state.todos.find((item) => item.id === id);
    Alert.alert(
      'Delete element',
      `Are you sure you want remove ${todo.title}?`,
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            changeScreen(null);
            dispatch({ type: 'REMOVE_TODO', id });
          },
        },
      ]
    );
  };
  const updateTodo = ({ id, title }) =>
    dispatch({ type: 'UPDATE_TODO', id, title });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
