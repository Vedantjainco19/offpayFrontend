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

const BankDetails = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    accNum: '',
    fullname: '',
    confAccNum: '',
    IFSC: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.accNum) {
      handleError('Please input account number', 'accNum');
      isValid = false;
    } else if (!inputs.accNum.match(/^-?\d+$/)) {
      handleError('Please input a  account number', 'accNum');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (inputs.confAccNum != inputs.accNum || !inputs.confAccNum) {
      handleError('Account numbers mismatched', 'confAccNum');
      isValid = false;
    }

    if (!inputs.IFSC) {
      handleError('Please input IFSC', 'IFSC');
      isValid = false;
    }

    if (isValid) {
      saveBankdetails();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userBankDetails');
      if (false) {
        const userData = JSON.parse(value);
        handleOnchange(userData.name, 'fullname');
        handleOnchange(userData.account, 'accNum');
        handleOnchange(userData.ifsc, 'IFSC');
      } else {
        setLoading(true);
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("https://afc0-2409-40c4-a-461-8482-db42-ef30-548d.ngrok-free.app/api/getBankdetails?userMobileNo=9479774658", requestOptions)
          .then(response => response.text())
          .then(result => getBankdetailResultHandle(result))
          .catch(error => console.log('error', error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBankdetailResultHandle = (result) => {
    setLoading(false);
    const res = JSON.parse(result);

    if (res.success == true) {
      setTimeout(() => {
        try {
          AsyncStorage.setItem('userBankDetails', JSON.stringify(res.data));
          handleOnchange(res.data.name, 'fullname');
          handleOnchange(res.data.account, 'accNum');
          handleOnchange(res.data.ifsc, 'IFSC');
        } catch (error) {
          Alert.alert('Error', 'Something went wrong');
        }
      }, 100);
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const resultHandle = (result, raw) => {
    setLoading(false);
    const res = JSON.parse(result);

    if (res.success == true) {
      Alert.alert('Success', res.message);
      setTimeout(() => {
        try {
          AsyncStorage.setItem('userBankDetails', raw);
          navigation.navigate('Home2');
        } catch (error) {
          Alert.alert('Error', 'Something went wrong');
        }
      }, 3000);
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const saveBankdetails = async () => {
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        userMobileNo: '9479774658',
        name: inputs.fullname,
        ifsc: inputs.IFSC,
        account: inputs.accNum,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://afc0-2409-40c4-a-461-8482-db42-ef30-548d.ngrok-free.app/api/addBankdetails/',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          resultHandle(result, raw);
        })
        .catch(error => console.warn('error', error));
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

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
        <Text style={{color: COLORS.black, fontSize: 30, fontWeight: 'bold'}}>
          Enter Bank Details
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="accNum-outline"
            label="Acount Holder Name"
            placeholder="Enter Full Name"
            value={inputs.fullname}
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'accNum')}
            onFocus={() => handleError(null, 'accNum')}
            iconName="account-outline"
            label="Bank Account Number"
            placeholder="Enter Your Bank Account Number"
            value={inputs.accNum}
            error={errors.accNum}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'confAccNum')}
            onFocus={() => handleError(null, 'confAccNum')}
            iconName="confAccNum-outline"
            label="Confirm Account Number"
            placeholder="Type Your Bank Account Number again"
            error={errors.confAccNum}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'IFSC')}
            onFocus={() => handleError(null, 'IFSC')}
            iconName="lock-outline"
            label="Bank IFSC code"
            placeholder="Enter IFSC code"
            value={inputs.IFSC}
            error={errors.IFSC}
            IFSC
          />
          <TouchableOpacity onPress={validate} style={styles.button}>
            <Text style={styles.buttonText}>Save Details</Text>
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

export default BankDetails;
