import { StyleSheet, Text, View } from 'react-native';

export const BookedScreen = () => {
  return (
    <View style={styles.center}>
      <Text>BookedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
