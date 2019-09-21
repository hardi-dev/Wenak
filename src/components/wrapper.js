import React, { Component } from 'react';
import {
SafeAreaView,
  StatusBar,
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import StylesGlobal from './../styles';

import { AdsBanner } from './../components/Ads';

import * as vars from './../styles/vars';

export default class Wrapper extends Component{
  
  render(){
    return(
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        {this.props.children}
        <View style={styles.bannerHolder}>
          <AdsBanner />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = new StyleSheet.create({
  bannerHolder: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.grey
  }
})