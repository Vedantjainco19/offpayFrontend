import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import Recieve from '../screens/Recieve';
import QRScanner from '../screens/QRscanner';
import BankDetails from '../screens/FavoriteScreen';
import TokenDetailScreen from '../screens/TokenDetailScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="tokenQR"
        component={TokenDetailScreen}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const RecieveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="recHome"
        component={Recieve}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="scanQR"
        component={QRScanner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#0066cc'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'aqua',
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#0066cc',
          },
          tabBarIcon: ({color, size}) => (
            <Text style={{color: color}}>Tokens</Text>
          ),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={RecieveStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Text style={{color: color}}>Recieve Money</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={BankDetails}
        options={{
          tabBarIcon: ({color, size}) => (
            <Text style={{color: color}}>Bank Details</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
