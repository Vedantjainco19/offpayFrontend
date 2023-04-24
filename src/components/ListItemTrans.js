import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../utils/Dimensions';

export default function ListItemTrans({sender,reciever, TransactionTime, amount, Description}) {
  reciever = (reciever) ? reciever : sender;
  return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          backgroundColor: (sender != null) ? 'green' : 'red',
          padding: 10,
          width: '100%',
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View style={{width: windowWidth - 220}}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
                fontWeight : 'bold'
              }}>
              {reciever}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 12,
                textTransform: 'uppercase',
                fontWeight : 'bold'
              }}>
              {TransactionTime}

            </Text>
          </View>
        </View>
        <View style={{width: 100}}>
        <Text
              numberOfLines={1}
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 12,
                fontWeight : 'bold'
              }}>
                Rs. {amount}
            </Text>
            </View>
            <View style={{width: 70}}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 13,
          }}>
          {Description}
        </Text>
        </View>
      </View>
  );
}
