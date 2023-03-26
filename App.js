import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';

export default function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleRemoveTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
        <AddTodo onSubmit={handleAddTodo} />
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={handleRemoveTodo} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
