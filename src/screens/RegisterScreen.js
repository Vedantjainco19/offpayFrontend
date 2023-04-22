import React, { useState } from 'react';
import { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from './../components/context';

const RegisterScreen = ({navigation}) => {
  const [otp, setOTP] = useState('');
  const { signIn } = React.useContext(AuthContext);
  const route = useRoute();

  const handleOTPVerification = () => {
    // const foundUser = Users.filter(item => {
    //   return mobile == route.params.mobile && otp == otp;
    // });

    if (route.params.mobile.length == 0 || otp.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'otp field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    const foundUser = {
      id: 2, 
      email: 'user2@email.com',
      username: 'user2', 
      password: 'pass1234', 
      userToken: 'token12345'
  };
    // if (foundUser.length == 0) {
    //   Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    signIn(foundUser);
    // navigation.navigate('Login');123
    // handle OTP verification logic
  };

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          ref={input1Ref}
          maxLength={1}
          value={otp[0]}
          onChangeText={(text) => {setOTP(text + otp.slice(1)); input2Ref.current.focus(); }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input2Ref}
          value={otp[1]}
          onChangeText={(text) => {setOTP(otp.slice(0, 1) + text + otp.slice(2)); input3Ref.current.focus(); }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input3Ref}
          value={otp[2]}
          onChangeText={(text) => {setOTP(otp.slice(0, 2) + text + otp.slice(3)); input4Ref.current.focus(); }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input4Ref}
          value={otp[3]}
          onChangeText={(text) => {setOTP(otp.slice(0, 3) + text); }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={handleOTPVerification} style={styles.button}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 32,
  },
  otpInput: {
    width: '20%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 18,
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
});

export default RegisterScreen;


const InputScreen = () => {
  const input1Ref = useRef();
  const input2Ref = useRef();

  const handleInput1Submit = () => {
    input2Ref.current.focus();
  };

  const handleInput2Submit = () => {
    // handle submission logic
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={input1Ref}
        style={styles.input}
        onSubmitEditing={handleInput1Submit}
        placeholder="Input 1"
      />
      <TextInput
        ref={input2Ref}
        style={styles.input}
        onSubmitEditing={handleInput2Submit}
        placeholder="Input 2"
      />
    </View>
  );
};

