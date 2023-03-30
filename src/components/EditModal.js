import { useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { THEME } from '../theme';

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
          <Button title="Save" onPress={saveHandler} />
          <Button
            color={THEME.DANGER_COLOR}
            title="Cancel"
            onPress={onCancel}
          />
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
