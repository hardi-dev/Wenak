import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {name as appName} from '../app';
import { AppRegistry } from 'react-native';

import Home from './screens/Home';
import RecipeArchive from './screens/RecipeArchive';
import RecipeDetail from './screens/RecipeDetail'

const navSwticher = createStackNavigator(
  {
    Home: Home,
    RecipeArchive: RecipeArchive,
    Detail: RecipeDetail
  }, {
    initialRouteName: 'Home'
})

AppRegistry.registerComponent(appName, () => navSwticher);
export default createAppContainer(navSwticher);