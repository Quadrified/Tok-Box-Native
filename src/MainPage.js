import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Reinput from 'reinput';
import Toast from 'react-native-simple-toast';
import SplashScreen from './../assets/upload.svg';
import AppSizes from './../themes/AppSizes';
import NotifService from './NotifyService';
import PushNotificationAndroid from 'react-native-push-notification';
import axios from 'axios';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheThing: true,
      credentials: {
        email: '',
      },
    };
    console.log(this.props);
    this.notif = new NotifService(this.onNotif.bind(this));
    //this.notif.scheduleNotif();
  }
  //   NotificationRegister = () => {
  //     // Register all the valid actions for notifications here and add the action handler for each action
  //     PushNotificationAndroid.registerNotificationActions(['Later', 'Accept']);
  //     DeviceEventEmitter.addListener('notificationActionReceived', function(e) {
  //       console.log('notificationActionReceived event received: ' + e);
  //       const info = JSON.parse(e.dataJSON);
  //       if (info.action == 'Accept') {
  //         // Do work pertaining to Accept action here
  //         this.props.navigation.navigate('TokScreen');
  //       } else {
  //         this.props.navigation.navigate('MainPage');
  //       }
  //       // Add all the required actions handlers
  //     });
  //   };

  onJoinCall = () => {
    console.log(this.props);
    this.props.navigation.navigate('TokScreen');
  };

  onEmailChange = e => {
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        email: e,
      },
    }));
  };
  renderEmail() {
    return (
      <View style={styles.FormInput}>
        <Reinput
          onChangeText={this.onEmailChange}
          label="Email ID"
          labelActiveColor="#6D7685"
          activeColor="#6D7685"
          underlineColor="#434343"
          color="#434343"
          fontSize={15}
          paddingBottom={10}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          returnKeyType="next"
          keyboardType="email-address"
        />
      </View>
    );
  }
  renderLoginButton() {
    return (
      <TouchableOpacity style={styles.Login} onPress={this.onLogin}>
        <Text style={styles.LoginText}>Invite</Text>
      </TouchableOpacity>
    );
  }

  onRegister = token => {
    console.log(token);
    this.setState({
      registerToken: token.token,
      gcmRegistered: true,
    });
  };

  onNotif(notif) {
    console.log(notif);
    if (notif.action === 'Accept') {
      this.setState({showTheThing: true});
      this.props.navigation.navigate('TokScreen');
      PushNotificationAndroid.cancelAllLocalNotifications();
    } else if (notif.action === 'Later') {
      this.setState({showTheThing: true});
      this.props.navigation.navigate('MainPage');
      PushNotificationAndroid.cancelAllLocalNotifications();
    }
  }
  onLogin = () => {
    let email = this.state.credentials.email;
    let emailReg = /^[A-Za-z_.0-9-]+@{1}[A-Za-z]+([.]{1}[A-Za-z]{2,4})+/;
    if (email == '') {
      Toast.show('Please enter email!', Toast.LONG);
    } else if (!emailReg.test(email)) {
      Toast.show('Please enter a Valid Email!', Toast.LONG);
    } else {
      let data = {
        email: this.state.credentials.email,
        invitelink: 'https://tokbox/callschedule',
      };
      axios
        .post('http://182.74.68.177:5002/api/v1/sendInvite', data, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          Toast.show('Invitation has been sent', Toast.LONG);
          this.props.navigation.navigate('TokScreen');
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#eee',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={styles.strip}>
          <Text style={styles.HomeText}> TokBox Demo </Text>
        </View>
        <View style={styles.FormContainer}>
          {this.renderEmail()}
          {this.renderLoginButton()}
        </View>

        {this.state.showTheThing && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              backgroundColor: '#7b1b1b',
              justifyContent: 'flex-end',
              position: 'absolute',
              bottom: 0,
              // marginTop: AppSizes.height - 150,
            }}>
            <Text style={styles.message}>Your call has been scheduled!</Text>
            <TouchableOpacity style={styles.Login} onPress={this.onJoinCall}>
              <Text style={styles.LoginText}>Join call</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HomeText: {
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strip: {
    width: '100%',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormContainer: {
    width: '100%',
    marginTop: 80,
    backgroundColor: '#99AAAB',
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: -30,
  },
  FormInput: {
    marginBottom: -16,
    margin: 10,
    width: '55%',
  },
  Login: {
    width: 110,
    height: 45,
    margin: 20,
    backgroundColor: '#FBB040',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    textAlign: 'center',
    fontSize: 17,
    alignSelf: 'center',
    color: '#fff',
  },
  message: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#fff',
  },
});
