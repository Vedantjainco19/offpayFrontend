import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {AuthContext} from '../components/context';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const QRScanner = () => {
  const {loginState} = React.useContext(AuthContext);
  const userToken = loginState.userToken;
  const route = useRoute();
  const navigation = useNavigation();
  const [scanningEnabled, setScanningEnabled] = useState(true);

  const handleBarCodeRead = event => {
    if (scanningEnabled) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        token: event.data,
        userMobileNo: userToken,
        amount: route.params.amount,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://592c-2401-4900-51c7-f912-75cf-86ec-8d03-4ac.ngrok-free.app/api/recieve/',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          const tokens = JSON.parse(result);
          if (tokens.success == true) {
            setScanningEnabled(false);
            Alert.alert('Success', tokens.message);
          } else {
            Alert.alert('Error', tokens.message);
            setScanningEnabled(false);
          }
          setTimeout(() => {
            setScanningEnabled(false);
            navigation.navigate('Home');
          }, 500);
        })
        .catch(error => console.log('error', error));
      // Disable scanning after successfully scanning a QR code
      setScanningEnabled(false);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
});

export default QRScanner;