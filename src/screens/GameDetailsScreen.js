import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RazorpayCheckout from 'react-native-razorpay';
import {AuthContext} from '../components/context';

const GameDetailsScreen = ({navigation, route}) => {
  const tokenval = route.params?.token;

  if (tokenval) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <QRCode
          value={tokenval}
          size={300}
          color="#000000"
          backgroundColor="#ffffff"
        />
        <Text style={{fontWeight: 'bold', fontSize: 25, marginTop: 20}}>
          Rs. {route.params?.amount}
        </Text>
      </View>
    );
  } else {
    const { loginState } = React.useContext(AuthContext);
    const userToken = loginState.userToken;
    const [amount, setAmount] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const [tokenName, setTokenName] = useState('');
    const handlePayment = () => {
      const options = {
        key: 'rzp_test_4DQa7mFA1iTGJy',
        amount: amount * 100,
        name: 'OffPay',
        description: 'Payment for offpay App',
        image: 'https://example.com/your_logo.png',
        prefill: {
          email: 'user@example.com',
          contact: userToken,
        },
        theme: {color: '#F37254'},
      };

      RazorpayCheckout.open(options)
        .then(paymentData => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            userMobileNo: userToken,
            ExpiryHours: timeDuration,
            TokenName: tokenName,
            Amount: amount,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(
            'https://719a-2401-4900-1c18-673d-2535-a652-1f4c-e84a.ngrok-free.app/api/createToken/',
            requestOptions,
          )
            .then(response => response.text())
            .then(result => {
              const tokens = JSON.parse(result);
              if (tokens.success == true) {
                Alert.alert('Success', tokens.message);
              } else {
                Alert.alert('Error', 'Something went wrong');
              }
              setTimeout(() => {
                navigation.navigate('Home2');
              }, 2000);
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => {
          // Payment failed
          console.log(error);
        });
    };

    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
        }}
        onPress={() => {
          setModalVisible(false);
          // this.setState({showAccountsPopup: false});
          // this.setState({isSelectAccountButtonSelected: this.state.paymentMode.uniqueName != '' ? true : false});
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 20,
            maxHeight: 400,
            alignSelf: 'stretch',
            paddingBottom: 5,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: 'grey',
            }}>
          <Text
            style={[
              {
                fontSize: 28,
                color: 'blue',
                marginHorizontal: 20,
                margin: 20,
                fontWeight: 'bold',
              },
            ]}>
            Create Secure Token
          </Text>
          <TextInput
              placeholder="Enter Name"
              value={tokenName}
              onChangeText={text => {
                setTokenName(text);
              }}
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 16,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 1.2,
              }}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              borderColor: 'grey',
            }}>
            <TextInput
              placeholder="Enter Amount"
              value={amount}
              onChangeText={text => {
                setAmount(text);
              }}
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 16,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 1.2,
              }}
              keyboardType={'number-pad'}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              borderColor: 'grey',
            }}>
            <TextInput
              placeholder="Enter Validity Time(In Hours)"
              style={{
                fontSize: 16,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 1.2,
              }}
              value={timeDuration}
              onChangeText={text => {
                setTimeDuration(text);
              }}
            
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                borderRadius: 20,
                margin: 20,
                marginHorizontal: 80,
              }}
              onPress={handlePayment}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 22,
                  padding: 10,
                  textAlign: 'center',
                }}>
                Create Token
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default GameDetailsScreen;
