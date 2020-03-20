import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import MainPage from './MainPage';
import TokScreen from './TokBoxScreen';

const AppStack = createStackNavigator(
  {
    MainPage: {
      screen: MainPage,
      navigationOptions: {
        headerShown: false,
      },
      path: 'mainpage',
    },
    TokScreen: {
      screen: TokScreen,
      navigationOptions: {
        headerShown: false,
      },
      path: 'callschedule',
    },
  },
  {
    initialRouteName: 'MainPage',
  },
);

const AppContainer = createAppContainer(AppStack);

export default () => {
  const prefix = 'tokbox://';
  return <AppContainer uriPrefix={prefix} />;
};
