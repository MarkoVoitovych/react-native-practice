import React, { useReducer } from 'react';

import { ScreenContext } from './screenContext';
import { screenReducer } from './screenReducer';

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, null);

  const changeScreen = (todoId) =>
    dispatch({ type: 'CHANGE_SCREEN', payload: todoId });

  return (
    <ScreenContext.Provider value={{ todoId: state, changeScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
