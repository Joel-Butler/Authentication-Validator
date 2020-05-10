/**
 * @format
 * @flow
 */

import React, {  Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import { Provider } from 'react-redux';

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'dev-9lskuac3.auth0.com', clientId: 'rZRwpkFw6N6qSTdWJH6LCnWbMu6UoMTj' });

class myApp extends React.Component {

  constructor(props) {
      super(props);
      this.state = {accessToken: ""};
  }

  _onLogin() {
    try { var result = 
      auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials => {
        Alert.alert('AccessToken: ' + credentials.accessToken);
        console.log(JSON.stringify(this));
        this.state.accessToken = credentials.accessToken;
      });
    }
    catch (error) {
      console.log(error);
    }

  }

  _onLogout() {
    try {var result = 
      auth0.webAuth
        .clearSession({})
        .then(success => {
          Alert.alert('Logged out!');
          this.setState({ accessToken: null });
      });
      
    }
    catch (error) {
      console.log(error);
    }
  }


  render() {
      return (
      <Provider store={store}>
        <View style = { styles.container }>
          <Text style = { styles.header }> Auth0Sample - Login </Text>
          <Text>
              Todo - figure out login state... token: {this.state.accessToken}</Text>
              <Button onPress = {this._onLogin}
              title = 'Log in' />
        </View >
      </Provider>
      );
  }
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


export default myApp;
