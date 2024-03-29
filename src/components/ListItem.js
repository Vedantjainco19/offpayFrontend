import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../utils/Dimensions';

export default function ListItem({name, status, date, amount, onPress}) {
  return (
  <TouchableOpacity  {...(status == 'ACTIVE') ? onPress={onPress} : ''} >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          backgroundColor: (status == 'ACTIVE') ? 'lightblue' : 'grey',
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
              {name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                textTransform: 'uppercase',
                fontWeight : 'bold'
              }}>
          {status == 'ACTIVE' && date}
          {status != 'ACTIVE' && 'NA'}

            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                fontWeight : 'bold'
              }}>
                Rs. {amount}

            </Text>
          </View>
        </View>

        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
