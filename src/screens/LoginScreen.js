import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView , Image} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [number, setNumber] = useState('');

  const handleLogin = () => {
    console.warn(number);
    navigation.navigate('Register');
    // handle login logic
  };

  const Logo = () => {
    return (
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.image}
        />
    );
  };

  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.container2}>
        <Logo />
        <Text style={styles.LabelStyle}>
          A Reverse Payment
        </Text>
        <Text style={styles.LabelStyle}>
         Transaction App
        </Text>
      </View>

      <View style={styles.container2}>
      <View style={{width : '90%', alignContent : 'center'}}>
        <Text style={styles.title}>Enter Your Mobile Number</Text>
        <Text  style={styles.title2}>A code will be sent to authorize your account.</Text>
        <Text  style={styles.title2}>If you don't have one yet let create it.</Text>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection : 'column',
    backgroundColor : '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: "#0066cc"
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#000"
  },
  input: {
    width: '88%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    marginBottom: 22,
    marginTop: 22,
  },
  button: {
    width: '88%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
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
  image: {
    width: 100,
    height: 100,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    width : '100%',
  },
});

export default LoginScreen;
