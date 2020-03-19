import React, {Component} from 'react';
import {View} from 'react-native';
import AppStack from './src/AppStack';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStack />
      </View>
    );
  }
}
