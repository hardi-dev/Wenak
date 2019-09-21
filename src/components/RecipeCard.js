import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import * as vars from '../styles/vars';

export default class RecipeCard extends Component{
  render(){
    const { data, navigation } = this.props;
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('Detail', { link: data.link, title: data.title, thumb: data.thumb })}
        style={[styles.cardHolder, this.props.itemStyle ? this.props.itemStyle : null ]}>
        <Image source={{uri: data.thumb}} style={styles.image}/>
        <Text style={styles.title}>{ data.title }</Text>
      </TouchableOpacity>
    )
  }
}

const { width, height } = Dimensions.get('window');
const cardWidth = width / 2;
const imageHeight = width / 3;

const styles = new StyleSheet.create({
  cardHolder: {
    width: cardWidth,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  image: {
    width: cardWidth,
    height: imageHeight,
    borderRadius: 5,
  },
  title: {
    fontFamily: vars.fontsPrimary.bold,
    fontSize: 16,
    color: vars.black,
    marginTop: vars.spacings.s
  }
})