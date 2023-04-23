import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import BannerSlider from '../components/BannerSlider';
import {paidGames} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import ListItemTrans from '../components/ListItemTrans';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    if (value == 2) {
      fetchtransData();
    }
    setGamesTab(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://afc0-2409-40c4-a-461-8482-db42-ef30-548d.ngrok-free.app/api/getAllTokens?userMobileNo=9479774658',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        const tokens = JSON.parse(result);
        if (tokens.success == true) {
          const datffa = tokens.data;
          setData(datffa);
          AsyncStorage.setItem('allTokens', JSON.stringify(datffa));
        } else {
          setData([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  const fetchtransData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      userMobileNo: '9165176133',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://afc0-2409-40c4-a-461-8482-db42-ef30-548d.ngrok-free.app/api/getTransactions/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        const trans = JSON.parse(result);
        if (trans.success == true) {
          const tokendata = trans.data;
          setTransactions(tokendata);
          AsyncStorage.setItem('transactions', JSON.stringify(tokendata));
        } else {
          setTransactions([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
          marginTop: 10,
          marginLeft: '5%',
        }}>
        <TouchableOpacity onPress={{}} style={styles.button}>
          <Text style={styles.buttonText}>Create New Token</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding: 20}}>
        <View style={{marginBottom: 10}}>
          <CustomSwitch
            selectionMode={1}
            option1="Tokens"
            option2="All Transactions"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {gamesTab == 1 && data
          ? data.map(item => (
              <ListItem
                key={item.token}
                name={item.tokenName}
                amount={item.amount}
                status={item.status}
                date={item.expiryTime}
                onPress={() =>
                  navigation.navigate('tokenQR', {
                    title: item.tokenName,
                    token: item.token,
                    amount: item.amount,
                  })
                }
              />
            ))
          : gamesTab == 1 && <Text>{data}</Text>}

        {gamesTab == 2 && transactions ? (
          transactions.map(item => (
            <ListItemTrans
              id={item.TransactionTime}
              sender={item.Sender}
              reciever={item.Reciever}
              amount={item.amount}
              TransactionTime={item.TransactionTime}
              Description={item.Description}
            />
          ))
        ) : (
          gamesTab == 2 && <Text>{transactions}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: '18%',
    height: 60,
    borderRadius: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
