import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from './../assets/upload.svg';
import AppSizes from './../themes/AppSizes';
import NotifService from './NotifyService';
import PushNotificationAndroid from 'react-native-push-notification';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheThing: false,
    };
    console.log(this.props);
    this.notif = new NotifService(this.onNotif.bind(this));
    this.notif.scheduleNotif();
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

  handlePerm = perms => {};

  render() {
    return (
      <View
        style={{
          backgroundColor: '#eee',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.strip}>
          <Text style={styles.HomeText}> TokBox Demo </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
