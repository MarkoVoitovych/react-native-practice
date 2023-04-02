import { useState } from 'react';
import { Alert, Modal, StyleSheet, TextInput, View } from 'react-native';

import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value.title);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error', `Miminal title length 3 symbols.`);
    } else {
      onSave({ id: value.id, title });
      onCancel();
    }
  };

  const cancelHandler = () => {
    onCancel();
    setTitle(value.title);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.button}>
          <AppButton onPress={saveHandler}>Save</AppButton>
          <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
            Cancel
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  button: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
