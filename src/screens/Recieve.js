import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import COLORS from '../components/colors';
import Input from '../components/Input';
import Loader from '../components/Loader';

const Recieve = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    amount: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.amount) {
      handleError('Please input amount to recieve', 'amount');
      isValid = false;
    } else if (!inputs.amount.match(/^-?\d+$/)) {
      handleError('Enter Valid amount', 'amount');
      isValid = false;
    }

    if (isValid) {
      openQRscanner();
    }
  };

  const openQRscanner = () => {
    navigation.navigate('scanQR', { amount: inputs.amount });
  }


  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Scan QR to accept payment
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'amount')}
            onFocus={() => handleError(null, 'accNum')}
            iconName="account-outline"
            label="Amount (in Rs.)"
            placeholder="Enter Amount to recieve"
            value={inputs.amount}
            error={errors.amount}
          />
          <TouchableOpacity onPress={validate} style={styles.button}>
            <Text style={styles.buttonText}>Tap to Scan QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
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
});

export default Recieve;
