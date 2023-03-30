import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

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
