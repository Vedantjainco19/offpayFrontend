import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class QRScanner extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Permission',
        message: 'App needs access to camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    }
  }

  onBarCodeRead = event => {
    const { loginState } = React.useContext(AuthContext);
    const userToken = loginState.userToken;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      token: event.data,
      userMobileNo: userToken,
      amount: this.props.amount,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://719a-2401-4900-1c18-673d-2535-a652-1f4c-e84a.ngrok-free.app/api/recieve/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    console.log(event.data);
    this.props.navigation.navigate('Home2');
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera style={styles.camera} onBarCodeRead={this.onBarCodeRead}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
          </View>
        </RNCamera>
      </View>
    );
  }
}

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
