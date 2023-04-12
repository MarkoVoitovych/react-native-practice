import {
  Pressable,
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import { AppText } from './AppText';
import { THEME } from '../../theme';

export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR }) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppText style={styles.text}>{children}</AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
