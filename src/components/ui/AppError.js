import { StyleSheet, View } from 'react-native';
import { THEME } from '../../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

export const AppError = ({ error, onPress }) => {
  return (
    <View style={styles.center}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={onPress}>{'Resume'}</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
