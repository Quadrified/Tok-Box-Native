import React, {Component} from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
import FlipCam from './assets/flipCam.svg';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.publisherProperties = {
      publishAudio: false,
      cameraPosition: 'back',
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('Publisher stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!', event);
      },
    };

    this.apiKey = '46561752';

    this.sessionId =
      '1_MX40NjU2MTc1Mn5-MTU4NDQ3MzY5MjEzMn5teFBvQW85WTlzZkJSVm1qN2RIVXNkQWx-fg';

    this.token =
      'T1==cGFydG5lcl9pZD00NjU2MTc1MiZzaWc9ZGViMTRhN2MzY2Q3M2NlNzQ2MWVmMzliMjQ2YTU5ODVkY2NmMDUyNjpzZXNzaW9uX2lkPTFfTVg0ME5qVTJNVGMxTW41LU1UVTRORFEzTXpZNU1qRXpNbjV0ZUZCdlFXODVXVGx6WmtKU1ZtMXFOMlJJVlhOa1FXeC1mZyZjcmVhdGVfdGltZT0xNTg0NDczNzE2Jm5vbmNlPTAuODUwNTczNjczODE5MjU1MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg1MDc4NTE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}
          style={{margin: 10}}>
          <OTPublisher style={{width: 500, height: 500}} />
          <OTSubscriber style={{width: 500, height: 500}} />
        </OTSession>
      </View>
    );
  }
}
