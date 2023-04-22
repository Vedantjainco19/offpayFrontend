import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

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
      <View style={{ alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#0066cc',
            marginTop: 150,
          }}>
          Welcome To
        </Text>
        <Text
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            color: '#0066cc',
            alignItems: 'center',
          }}>
          OFFPAY
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          padding: 20,
          backgroundColor: '#0066cc',
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
