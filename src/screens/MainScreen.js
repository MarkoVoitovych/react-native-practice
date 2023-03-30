import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';

export const MainScreen = ({
  handleAddTodo,
  todos,
  handleRemoveTodo,
  openTodo,
}) => {
  let content = (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={handleRemoveTodo} onOpen={openTodo} />
      )}
    />
  );

  if (!todos.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/images.jpg')}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={handleAddTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
