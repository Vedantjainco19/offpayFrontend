import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Gaming from '../assets/images/misc/gaming.svg';

const LoginScreen = () => {
  const [number, setNumber] = useState('');

  const handleLogin = () => {
    // handle login logic
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.LabelStyle}>
          A Reverse Payment
        </Text>
        <Text style={styles.LabelStyle}>
         Transaction App
        </Text>
      </View>

      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <TextInput
        placeholder="99999 99999"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>GET OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LabelStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'center',
  },
});

export default LoginScreen;
