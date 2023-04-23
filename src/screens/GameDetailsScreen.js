import React from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const GameDetailsScreen = ({navigation, route}) => {
  const tokenval = route.params?.token;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <QRCode
        value={tokenval}
        size={300}
        color="#000000"
        backgroundColor="#ffffff"
      />
      <Text style = {{fontWeight : 'bold', fontSize : 25, marginTop : 20}}>Rs. {route.params?.amount}</Text>
    </View>
  );
};

export default GameDetailsScreen;
