import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import moment from 'moment';
import * as vars from './../styles/vars';

export default class RecipeListItem extends Component {
  render(){
    const { data, navigation } = this.props;
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('Detail', {link: data.link, title: data.title, thumb: data.thumb })}
        style={styles.holder}>
        <Image source={{ uri: data.thumb }} style={styles.image}/>
        <View style={styles.meta}>
          <Text style={styles.date}>{moment(data.date).fromNow()}</Text>
          <Text style={styles.title}>{ data.title }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const { width, height } = Dimensions.get('window');
const imageDimension = (width / 3) - 40;


const styles = new StyleSheet.create({
  holder: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: vars.spacings.l,
    borderBottomColor: vars.grey,
    borderBottomWidth: 1
  },
  image: {
    width: imageDimension,
    height: imageDimension,
    borderRadius: 5,
    marginRight: vars.spacings.m
  },
  meta: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  date: {
    fontFamily: vars.fontsPrimary.regular,
    fontSize: 12,
    color: vars.black
  },
  title: {
    fontSize: 16,
    fontFamily: vars.fontsPrimary.bold,
    color: vars.black
  }
})