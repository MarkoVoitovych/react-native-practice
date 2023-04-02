import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { TodoState } from './src/context/todo/TodoState';
import { MainLayout } from './src/MainLayout';
import { ScreenState } from './src/context/screen/ScreenState';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await (async () => {
          await Font.loadAsync({
            'roboto-regular': require('./assets/Roboto-Regular.ttf'),
            'roboto-bold': require('./assets/Roboto-Bold.ttf'),
          });
        })();
      } catch (e) {
        Alert.alert(e.message);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  } else {
    return (
      <ScreenState>
        <TodoState>
          <MainLayout />
        </TodoState>
      </ScreenState>
    );
  }
}
