/**
 * @format
 * @flow
 */

import React, {  Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'dev-9lskuac3.auth0.com', clientId: 'rZRwpkFw6N6qSTdWJH6LCnWbMu6UoMTj' });

export default function myApp () {
  const [credentials, setCredentials] = useState(null);
    return (
      <View style = { styles.container }>
        <Text style = { styles.header }> Auth0Sample - Login </Text>
        <Text>Login State: {credentials} </Text>
        <UserStatus />
      </View >
    );
}

function UserStatus() {
  const [credentials, setCredentials] = useState(null);
  return(
      
      <Button onPress = { (credentials == null) ? ()=> {
        try { var result = 
          auth0.webAuth
          .authorize({scope: 'openid profile email'})
          .then(credentials => {
            Alert.alert('AccessToken: ' + credentials.accessToken);
            setCredentials(credentials.accessToken);
          });
        }
        catch (error) {
          console.log(error);
        }
      } : ()=> {
        try {var result = 
          auth0.webAuth
            .clearSession({})
            .then(success => {
              Alert.alert('Logged out!');
              setCredentials(credentials.accessToken);
          });
          
        }
        catch (error) {
          console.log(error);
        } 
      } }
      title = { credentials ? 'Log out' : 'Log in' } />

  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
  },
  header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  }
});
