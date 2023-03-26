import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})