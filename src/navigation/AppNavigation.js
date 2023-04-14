import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { MainScreen } from '../screens/MainScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../assets/colors/theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

import { useTheme } from 'react-native-paper';

const PostStack = createStackNavigator();
const BookedStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const MaterialTabs = createMaterialBottomTabNavigator();

const PostNavigator = () => (
  <PostStack.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
      },
      headerTitleStyle: {
        fontSize: 18,
        color: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
      },
      headerTitleAlign: 'center',
    }}
  >
    <PostStack.Screen
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
    <PostStack.Screen
      name="Post"
      component={PostScreen}
      options={({ route }) => ({
        title: `Post date: ${new Date(route.params.date).toLocaleDateString()}`,
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
  </PostStack.Navigator>
);

const BookedNavigator = () => (
  <BookedStack.Navigator
    initialRouteName="Booked"
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
      },
      headerTitleStyle: {
        fontSize: 18,
        color: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
      },
      headerTitleAlign: 'center',
    }}
  >
    <BookedStack.Screen
      name="Booked"
      component={BookedScreen}
      options={{
        headerTitle: 'Booked posts',
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
    <BookedStack.Screen
      name="PostBooked"
      component={PostScreen}
      options={({ route }) => ({
        title: `Post date: ${new Date(route.params.date).toLocaleDateString()}`,
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
  </BookedStack.Navigator>
);

const BottomNavigator = () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: THEME.MAIN_COLOR,
    }}
  >
    <BottomTabs.Screen
      name="PostBottom"
      component={PostNavigator}
      options={{
        tabBarLabel: 'All',
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-albums" size={25} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="BookedBottom"
      component={BookedNavigator}
      options={{
        tabBarLabel: 'Booked',
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-star" size={25} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

const MaterialNavigator = () => (
  <MaterialTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: THEME.MAIN_COLOR,
      },
    }}
    shifting={true}
    activeColor={'#fff'}
    inactiveColor={'#ffffffb3'}
    barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
  >
    <MaterialTabs.Screen
      name="Posts"
      component={PostNavigator}
      options={{
        tabBarColor: THEME.MAIN_COLOR,
        tabBarLabel: 'All',
        tabBarIcon: ({ color }) => (
          <Ionicons
            name="ios-albums"
            size={25}
            color={color}
            backgroundColor={THEME.MAIN_COLOR}
          />
        ),
      }}
    />
    <MaterialTabs.Screen
      name="Booked"
      component={BookedNavigator}
      options={{
        tabBarLabel: 'Booked',
        tabBarColor: THEME.MAIN_COLOR,
        tabBarIcon: ({ color }) => (
          <Ionicons
            name="ios-star"
            size={25}
            color={color}
            backgroundColor={THEME.MAIN_COLOR}
          />
        ),
      }}
    />
  </MaterialTabs.Navigator>
);

export const AppNavigation = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';

  return (
    <NavigationContainer>
      {Platform.OS === 'android' ? <MaterialNavigator /> : <BottomNavigator />}
    </NavigationContainer>
  );
};
