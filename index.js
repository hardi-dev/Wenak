/**
 * @format
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigation from './src/navigation';

class App extends Component{
  render(){
    return(
      <Navigation />
    )
  }
}

AppRegistry.registerComponent(appName, () => App);
