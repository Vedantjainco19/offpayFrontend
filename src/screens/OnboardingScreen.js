import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#000',
            alignItems: 'center',
            marginTop: 150,
          }}>
          WELCOME TO OFFPAY
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          padding: 20,
          backgroundColor: '#000',
          width: '90%',
          justifyContent: 'space-between',
          borderRadius: 5,
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
          Get started
        </Text>
        <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
          &gt;
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
