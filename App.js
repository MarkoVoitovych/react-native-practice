import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await (async () => {
          await Font.loadAsync({
            'roboto-regular': require('./assets/Roboto-Regular.ttf'),
            'roboto-bold': require('./assets/Roboto-Bold.ttf'),
          });
        })();
      } catch (e) {
        Alert.alert(e.message);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdateTodo = ({ id, title }) => {
    setTodos((prev) =>
      prev.map((item) => (item.id !== id ? item : { id, title }))
    );
  };

  const handleRemoveTodo = (id) => {
    const todo = todos.find((item) => item.id === id);

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
            setTodoId(null);
            setTodos((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      handleAddTodo={handleAddTodo}
      handleRemoveTodo={handleRemoveTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((item) => item.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        onRemoveTodo={handleRemoveTodo}
        todo={selectedTodo}
        onSave={handleUpdateTodo}
      />
    );
  }
  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
