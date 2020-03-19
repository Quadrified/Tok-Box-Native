import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import MainPage from './MainPage';
import TokScreen from './TokBoxScreen';

const AppStack = createStackNavigator(
  {
    MainPage: {
      screen: MainPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    TokScreen: {
      screen: TokScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MainPage',
  },
);

export default createAppContainer(AppStack);
