import React, {Component} from 'react';
import {View, TouchableOpacity, Button, Text, BackHandler} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamProperties: {},
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
        console.log('Publisher stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!', event);
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
      '1_MX40NjU2MTc1Mn5-MTU4NDQ3MzY5MjEzMn5teFBvQW85WTlzZkJSVm1qN2RIVXNkQWx-fg';

    this.token =
      'T1==cGFydG5lcl9pZD00NjU2MTc1MiZzaWc9ZGViMTRhN2MzY2Q3M2NlNzQ2MWVmMzliMjQ2YTU5ODVkY2NmMDUyNjpzZXNzaW9uX2lkPTFfTVg0ME5qVTJNVGMxTW41LU1UVTRORFEzTXpZNU1qRXpNbjV0ZUZCdlFXODVXVGx6WmtKU1ZtMXFOMlJJVlhOa1FXeC1mZyZjcmVhdGVfdGltZT0xNTg0NDczNzE2Jm5vbmNlPTAuODUwNTczNjczODE5MjU1MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg1MDc4NTE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <OTSession
            apiKey={this.apiKey}
            sessionId={this.sessionId}
            token={this.token}
            eventHandlers={this.sessionEventHandlers}
            style={{margin: 10}}>
            <OTSubscriber
              properties={this.subscriberProperties}
              eventHandlers={this.subscriberEventHandlers}
              streamProperties={this.state.streamProperties}
              style={{height: 100, width: 100}}
            />
            <OTPublisher
              properties={this.publisherProperties}
              eventHandlers={this.publisherEventHandlers}
              style={{width: 200, height: 250, marginTop: 5}}
            />
          </OTSession>
          <TouchableOpacity
            style={{
              borderRadius: 6,
              marginTop: 10,
              backgroundColor: '#E71C23',
              height: 55,
              width: 120,
              marginLeft: 230,
              marginTop: -100,
            }}
            onPress={() => {
              BackHandler.exitApp();
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  padding: 12,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                End Call
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
