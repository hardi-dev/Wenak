import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import RecipeCard from './RecipeCard';
import RecipeCardLast from './RecipeCardLast';
import { icons } from '../helper/iconLoader';
import * as vars from '../styles/vars';

export default class RecipeHorizontalList extends Component{

  render(){
    const { title, data, slug } = this.props;
    const { navigation } = this.props;
    // console.log(this.props.navigation)
    return(
      <View style={styles.holder}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RecipeArchive', { slug, title }) }
            >
            <View style={styles.allBtn}>
              <Text style={styles.btnLebel}> Lihat Semua </Text>
              <Image source={icons.arrow_right} style={styles.headerIcon}/>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}>
            {
              data.map((el, idx) => (
                <RecipeCard
                  navigation={navigation} 
                  key={idx}
                  data={el}
                  itemStyle={styles.itemStyle}/>
              ))
            }
            <RecipeCardLast title="View All" itemStyle={styles.lastItem} navigation={navigation} data={{slug, title}}/>
          </ScrollView>
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  holder: {
    paddingVertical: vars.spacings.xl,
    borderBottomWidth: 1,
    borderBottomColor: vars.grey
  },
  header: {
    paddingHorizontal: vars.spacings.m,
    marginBottom: vars.spacings.m,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: vars.fontsPrimary.regular,
    fontSize: 14,
    color: vars.black,
  },
  btnLebel: {
    fontFamily: vars.fontsPrimary.regular,
    fontSize: 14,
    color: vars.black,
  },  
  allBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  itemStyle: {
    marginLeft: vars.spacings.m
  },
  lastItem: {
    marginHorizontal: vars.spacings.m
  }
})