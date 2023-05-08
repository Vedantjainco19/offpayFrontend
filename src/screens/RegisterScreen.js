import React, {useState} from 'react';
import {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {AuthContext} from './../components/context';

const RegisterScreen = ({navigation}) => {
  const [otp, setOTP] = useState('');
  const {authContext} = React.useContext(AuthContext);
  const route = useRoute();

  const handleOTPVerification = () => {
    // const foundUser = Users.filter(item => {
    //   return mobile == route.params.mobile && otp == otp;
    // });

    if (route.params.mobile.length == 0 || otp.length == 0) {
      Alert.alert('Wrong Input!', 'otp field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      mobileNo: route.params.mobile,
      otp: otp,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://592c-2401-4900-51c7-f912-75cf-86ec-8d03-4ac.ngrok-free.app/api/verifyLogin/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        const tokens = JSON.parse(result);
        if (tokens.success == true) {
          const foundUser = {
            id: 1,
            email: 'user@email.com',
            username: route.params.mobile,
            password: 'pass1234',
            userToken: route.params.mobile,
          };
          setTimeout(() => {
            authContext.signIn(foundUser);
          }, 1000);
        } else {
          Alert.alert('Error', tokens.message);
        }
      })
      .catch(error => console.log('error', error));
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
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace'
              ? input1Ref.current.focus()
              : input2Ref.current.focus();
          }}
          onChangeText={text => {
            setOTP(text + otp.slice(1));
          }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input2Ref}
          value={otp[1]}
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace'
              ? input1Ref.current.focus()
              : input3Ref.current.focus();
          }}
          onChangeText={text => {
            setOTP(otp.slice(0, 1) + text + otp.slice(2));
          }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input3Ref}
          value={otp[2]}
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace'
              ? input2Ref.current.focus()
              : input4Ref.current.focus();
          }}
          onChangeText={text => {
            setOTP(otp.slice(0, 2) + text + otp.slice(3));
          }}
          style={styles.otpInput}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={1}
          ref={input4Ref}
          value={otp[3]}
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace'
              ? input3Ref.current.focus()
              : input4Ref.current.focus();
          }}
          onChangeText={text => {
            setOTP(otp.slice(0, 3) + text);
          }}
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
