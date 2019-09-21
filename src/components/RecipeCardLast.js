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

export default class RecipeCardLast extends Component{
  render(){
    const { title, navigation, data } = this.props;

    return(
      <TouchableOpacity 
        onPress={ () => navigation.navigate('RecipeArchive', { slug: data.slug, title: data.title }) }
        style={[styles.cardHolder, this.props.itemStyle ? this.props.itemStyle : null ]}>
        <Text style={styles.title}>{ title }</Text>
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
    height: imageHeight,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.grey,
  },
  title: {
    fontFamily: vars.fontsPrimary.regular,
    fontSize: 14,
    color: vars.black,
    textAlign: 'center',
  }
})