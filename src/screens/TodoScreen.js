import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';

export const TodoScreen = ({ goBack, todo, onRemoveTodo, onSave }) => {
  const [modal, setModal] = useState(false);

  return (
    <View>
      <EditModal
        value={todo}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={onSave}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Edit" onPress={() => setModal(true)} />
      </AppCard>
      <View style={styles.btnContainer}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color="#757575" />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove"
            color={'#e53935'}
            onPress={() => onRemoveTodo(todo.id)}
          />
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
