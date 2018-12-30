import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from 'src/ui/screens/HomeScreen';
import CommentScreen from 'src/ui/screens/CommentScreen';

const { Constants } = require('src/core/utils');

const Router = createStackNavigator({
  [Constants.screenRoutes.homeScreen]: { screen: HomeScreen },
  [Constants.screenRoutes.commentScreen]: { screen: CommentScreen },
}, {
  headerMode: 'none',
});

export default Router;
