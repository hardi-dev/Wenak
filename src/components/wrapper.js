import React, { Component } from 'react';
import {
SafeAreaView,
  StatusBar
} from 'react-native';
import StylesGlobal from './../styles';

export default class Wrapper extends Component{
  
  render(){
    return(
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        {this.props.children}
      </SafeAreaView>
    )
  }
}