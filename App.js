import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import fonts from './src/assets/fonts/fonts';
import { AppNavigation } from './src/navigation/AppNavigation';

function App() {
  return <AppNavigation />;
}

export default () => {
  const [isReady, setIsReady] = useState(false);
  SplashScreen.preventAutoHideAsync();

  const loadFonts = async () => {
    await Font.loadAsync(fonts);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadFonts();
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
    return <App />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
