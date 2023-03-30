import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../theme';

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
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.btnContainer}>
        <View style={styles.button}>
          <AppButton onPress={goBack} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="white" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemoveTodo(todo.id)}
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
