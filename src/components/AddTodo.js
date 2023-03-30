import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handlePress = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss();
    } else {
      Alert.alert('Empty input!');
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Add some task"
        autoCorrect={false}
        autoCapitalize="sentences"
        keyboardType="default"
      />
      <AntDesign.Button onPress={handlePress} name="pluscircleo">
        Add
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  input: {
    width: '65%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#3949ab',
  },
});
