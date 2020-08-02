import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CallIcon from '../assets/Call_Icon.svg';
import Calendar from '../assets/Calendar.svg';

import { SearchBar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import NotifService from './NotifyService';
import PushNotificationAndroid from 'react-native-push-notification';
import axios from 'axios';
import data from './Countries';
import { Input } from 'native-base';
import styles from './styles';

const defaultFlag = data.filter(obj => obj.name === 'United States')[0].flag;
const defaultcode = data.filter(obj => obj.name === 'United States')[0]
  .dial_code;

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheThing: true,
      credentials: {
        email: '',
      },
      flag: defaultFlag,
      flagdialcode: defaultcode,
      modalVisible: false,
      phoneNumber: '',
      isLoading: true,
      search: '',
    };
    this.arrayholder = [];
    this.notif = new NotifService(this.onNotif.bind(this));
    //this.notif.scheduleNotif();
  }
  componentDidMount() {
    this.setState(
      {
        isLoading: false,
        dataSource: data,
      },
      function () {
        this.arrayholder = data;
      },
    );
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const itemFlag = item.flag ? item.flag : '';
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return <View style={styles.listStyle} />;
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
    console.log(this.state.phoneNumber);
  }

  showModal() {
    this.setState({ modalVisible: true, dataSource: data, search: '' });
  }

  hideModal() {
    this.setState({ modalVisible: false });
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus();
  }

  async getCountry(country) {
    const countryData = await data;
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country,
      )[0].dial_code;
      const countryFlag = await countryData.filter(
        obj => obj.name === country,
      )[0].flag;
      // Set data from user choice of country
      this.setState({ flag: countryFlag, flagdialcode: countryCode });
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

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

  renderInviteButton() {
    return (
      <TouchableOpacity style={styles.InviteButton} onPress={this.onInvite}>
        <View style={styles.InviteContainer}>
          <Text style={styles.InviteText}>Invite</Text>
        </View>
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
      this.setState({ showTheThing: true });
      this.props.navigation.navigate('TokScreen');
      PushNotificationAndroid.cancelAllLocalNotifications();
    } else if (notif.action === 'Later') {
      this.setState({ showTheThing: true });
      this.props.navigation.navigate('MainPage');
      PushNotificationAndroid.cancelAllLocalNotifications();
    }
  }

  onInvite = () => {
    let phoneNumber = this.state.phoneNumber;
    let emailReg = /^[A-Za-z_.0-9-]+@{1}[A-Za-z]+([.]{1}[A-Za-z]{2,4})+/;
    if (phoneNumber == '') {
      Toast.show('Please Enter a Mobile Number!', Toast.LONG);
    } else {
      let data = {
        to: this.state.flagdialcode + this.state.phoneNumber,
        message:
          'Your call has been scheduled. Please click on the link below to join the call https://tokbox/callschedule',
      };
      console.log(data);
      axios
        .post('http://182.74.68.177:5001/api/v1/sendsms', data, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          Toast.show('Invitation has been sent!', Toast.LONG);
          this.props.navigation.navigate('TokScreen');
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  render() {
    let { flag, flagdialcode } = this.state;

    return (
      <View style={styles.RootContainer}>
        <LinearGradient
          colors={['#0F2027', '#108CE2']}
          style={styles.linearGradient}>
          <View style={styles.callSvg}>
            <CallIcon height={60} width={60} />
          </View>

          <View style={styles.FormContainer}>
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                Please enter a Mobile number to Invite!
              </Text>
            </View>

            <View style={styles.PhoneInputContainer}>
              <View>
                <TouchableOpacity onPress={() => this.showModal()}>
                  <View>
                    <Text style={styles.flagIcon}>{flag}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.flagCodeContainer}>
                <Text style={styles.inputflag}>{flagdialcode} </Text>
              </View>

              <Input
                style={styles.inputStyle}
                placeholder="766554433"
                placeholderTextColor="#99AAAB"
                keyboardType={'phone-pad'}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                ref="PhoneInput"
                value={this.state.phoneNumber}
                onChangeText={val => {
                  if (this.state.phoneNumber === '') {
                    // render US phone code by default when Modal is not open
                    this.onChangeText('phoneNumber', val);
                  } else {
                    // render country code based on users choice with Modal
                    this.onChangeText('phoneNumber', val);
                  }
                }}
              />
              <Modal
                animationType="slide" // fade
                transparent={false}
                visible={this.state.modalVisible}>
                <View style={{ flex: 1 }}>
                  <View>
                    <View>
                      <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        placeholder="Search for a country code..."
                        value={this.state.search}
                      />
                    </View>
                    <FlatList
                      data={this.state.dataSource}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={this.ListViewItemSeparator}
                      enableEmptySections={true}
                      renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                          onPress={() => this.getCountry(item.name)}>
                          <View
                            style={[
                              styles.countryStyle,
                              {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              },
                            ]}>
                            <Text style={{ fontSize: 40 }}>{item.flag}</Text>
                            <Text style={{ fontSize: 20, color: '#000' }}>
                              {item.name} ({item.dial_code})
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                    />
                  </View>
                  <View style={styles.closeBtnContainer}>
                    <TouchableOpacity
                      onPress={() => this.hideModal()}
                      style={styles.closeButtonStyle}>
                      <Text style={styles.textStyle}>Close </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:5,
            }}>
              {this.renderInviteButton()}
            </View>

          </View>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={['#108CE2', '#0F2027']}
            style={styles.linearGradientBottom}>
            <View style={styles.calendarSvg}>
              <Calendar height={60} width={60} />
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.message}>Your call has been scheduled</Text>
            </View>
            <TouchableOpacity
              style={styles.InviteButton}
              onPress={this.onJoinCall}>
              <View style={styles.InviteContainer}>

                <Text style={styles.InviteText}>Join call</Text>

              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
