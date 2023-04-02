import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const selectedTodo = todos.find((item) => item.id === todoId);

  return (
    <View>
      <EditModal
        value={selectedTodo}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={updateTodo}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{selectedTodo.title}</Text>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.btnContainer}>
        <View style={styles.button}>
          <AppButton
            onPress={() => changeScreen(null)}
            color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={20} color="white" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(selectedTodo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
});
