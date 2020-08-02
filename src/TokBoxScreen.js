import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
import Toast from 'react-native-simple-toast';
import EndCall from '../assets/endcall.svg';

export default class TokBoxScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamProperties: {},
      publisherProperties: {},
      activityindicator: true,
      publisherwidth: '100%',
      publisherheight: '100%',
    };

    this.subscriberProperties = {
      subscribeToAudio: false,
      subscribeToVideo: true,
    };

    this.publisherProperties = {
      publishAudio: true,
      cameraPosition: 'front',
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        const publisherProperties = {
          ...this.state.publisherProperties,
          [event.streamId]: {
            publishAudio: true,
            cameraPosition: 'front',
            style: {
              width: 400,
              height: 350,
            },
          },
        };
        this.setState({publisherProperties});
        Toast.show('You have joined in the Call', Toast.LONG);
        this.setState({activityindicator: false});
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!', event);
        this.setState({activityindicator: false});
      },
    };

    this.sessionEventHandlers = {
      streamCreated: event => {
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            style: {
              width: 400,
              height: 350,
            },
          },
        };
        Toast.show('Your Call has Started', Toast.LONG);
        this.setState({streamProperties});
      },
    };

    this.subscriberEventHandlers = {
      error: error => {
        console.log(`There was an error with the subscriber: ${error}`);
      },
    };

    this.apiKey = '46561752';

    this.sessionId =
      '2_MX40NjU2MTc1Mn5-MTU4NTA0OTA4NDIwOX4yK0hqc3NvamMwK2dCRWlvWldBTWNnUGN-fg';

    this.token =
      'T1==cGFydG5lcl9pZD00NjU2MTc1MiZzaWc9ZmM0ZmU5ZTQwYzIyNWM0ZGZmZWFmZGNkYjA0YjBiMGQ3OWQzMTg3ZTpzZXNzaW9uX2lkPTJfTVg0ME5qVTJNVGMxTW41LU1UVTROVEEwT1RBNE5ESXdPWDR5SzBocWMzTnZhbU13SzJkQ1JXbHZXbGRCVFdOblVHTi1mZyZjcmVhdGVfdGltZT0xNTg1MDQ5MjI4Jm5vbmNlPTAuNTU2MzMxNzMyMjY4OTk1MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg3NjQxMjI2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }

  onDisconnect = () => {
    //   BackHandler.exitApp();
    this.props.navigation.navigate('MainPage');
    Toast.show('Your call has been disconnected!', Toast.LONG);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size="large"
            animating={this.state.activityindicator}
            color="#0000ff"
          />
        </View>

        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}
          eventHandlers={this.sessionEventHandlers}
          style={{margin: 10, flex: 1}}>
          <OTSubscriber
            properties={this.subscriberProperties}
            eventHandlers={this.subscriberEventHandlers}
            streamProperties={this.state.streamProperties}
            style={{height: 100, width: 100, flex: 1}}
          />
          <OTPublisher
            properties={this.publisherProperties}
            eventHandlers={this.publisherEventHandlers}
            streamProperties={this.state.publisherProperties}
            style={{
              width: this.state.publisherwidth,
              height: this.state.publisherheight,
              marginTop: 5,
              flex: 1,
            }}
          />
        </OTSession>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            marginBottom: 50,
          }}>
          <TouchableOpacity onPress={this.onDisconnect}>
            <View>
              <EndCall width={80} height={80} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
