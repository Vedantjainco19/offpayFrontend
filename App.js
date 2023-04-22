import React from 'react';
import { useState, useEffect } from "react";

import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/navigation/AuthStack';
import TabNavigator from './src/navigation/TabNavigator';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;

