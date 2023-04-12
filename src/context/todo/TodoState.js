import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { ScreenContext } from '../screen/screenContext';
import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from '../types';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const BASE_URL =
  'https://react-native-practice-todoapp-default-rtdb.europe-west1.firebasedatabase.app';

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, payload: error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodos = async () => {
    clearError();
    showLoader();
    try {
      const response = await fetch(`${BASE_URL}/todos.json`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = (await response.json()) || [];
      const todos = Object.keys(data).map((id) => ({ ...data[id], id }));
      dispatch({ type: FETCH_TODOS, payload: todos });
    } catch (error) {
      console.log(error.message);
      showError('Something went wrong...');
    } finally {
      hideLoader();
    }
  };

  const addTodo = async (title) => {
    const response = await fetch(`${BASE_URL}/todos.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    dispatch({ type: 'ADD_TODO', title, id: data.name });
  };

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
          onPress: async () => {
            showLoader();
            changeScreen(null);
            await fetch(`${BASE_URL}/todos/${id}.json`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            dispatch({ type: 'REMOVE_TODO', id });
            hideLoader();
          },
        },
      ]
    );
  };
  const updateTodo = async ({ id, title }) => {
    clearError();
    showLoader();
    try {
      await fetch(`${BASE_URL}/todos/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      dispatch({ type: 'UPDATE_TODO', id, title });
    } catch (error) {
      showError('Something went wrong...');
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        fetchTodos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
