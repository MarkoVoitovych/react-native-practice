import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';

export const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1,
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: '#3949ab',
      },
    }),
  },
  text: {
    color: THEME.MAIN_COLOR,
    ...Platform.select({
      ios: {
        color: THEME.MAIN_COLOR,
      },
      android: {
        color: 'white',
      },
    }),
    fontSize: 28,
  },
});
