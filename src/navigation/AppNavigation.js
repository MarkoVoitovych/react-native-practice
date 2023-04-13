import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MainScreen } from '../screens/MainScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../assets/colors/theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
          },
          headerTitleStyle: {
            fontSize: 18,
            color: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitle: 'My blog',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="Take photo"
                  iconName="ios-camera"
                  onPress={() => {
                    console.log('Press photo');
                  }}
                />
              </HeaderButtons>
            ),
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="Toggle Drawer"
                  iconName="ios-menu"
                  onPress={() => {
                    console.log('Press menu');
                  }}
                />
              </HeaderButtons>
            ),
          }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={({ route }) => ({
            title: `Post date: ${route.params.date}`,
            headerRight: () => {
              const iconName = route.params.booked
                ? 'ios-star'
                : 'ios-star-outline';
              return (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title="Take photo"
                    iconName={iconName}
                    onPress={() => {
                      console.log('Press photo');
                    }}
                  />
                </HeaderButtons>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
