import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RazorpayCheckout from 'react-native-razorpay';

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
    const [amount, setAmount] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const handlePayment = () => {
      const options = {
        key: 'rzp_test_4DQa7mFA1iTGJy',
        amount: amount*100,
        name: 'OffPay',
        description: 'Payment for offpay App',
        image: 'https://example.com/your_logo.png',
        prefill: {
          email: 'user@example.com',
          contact: '9479774658',
        },
        theme: {color: '#F37254'},
      };
    
      RazorpayCheckout.open(options)
        .then((paymentData) => {
          // Payment successful
          console.log(paymentData);
        })
        .catch((error) => {
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
        <Text
          style={[
            {
              fontSize: 28,
              color: 'blue',
              marginHorizontal: 20,
              margin: 20,
              fontWeight : 'bold'
            },
          ]}>
          Create Secure Token
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderColor: 'grey',
          }}>
          <TextInput
            placeholder="Enter Amount"
            value={amount}
            onChangeText={(text) => {
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
            onChangeText={(text) => {
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
    )
  }
};

export default GameDetailsScreen;
