
import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import RecipeListItem from './../components/RecipeListItem';

import Wrapper from './../components/wrapper';
import { WEB_URL, ARCHIVE_URL } from './../helper/constant';
import { loadHTML } from './../helper/scraper';
import { isCloseToBottom } from './../helper/helper';
import * as vars from '../styles/vars';

export default class RecipeArchive extends Component{

  state = {
    isLoading: true,
    isLoadMore: false,
    currentPage: 1,
    postList: [],
    link: '',
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: `Archive ${navigation.getParam('title', '')}`
    }
  };

  componentDidMount(){
    const { navigation } = this.props;
    const slug = navigation.getParam('slug', 'no-slug');
    this.setState({
      link: slug
    }, async () => {
      this._fethArchive();
    })
  }

  _fethArchive = async () => {
    const slug = this.state.link;
    const $ = await loadHTML(`${ARCHIVE_URL[slug]}page/${this.state.currentPage}`);
    const postList = await this._fetchRecipePerPage($);
    this.setState({
      isLoading: false,
      currentPage: this.state.currentPage + 1,
      postList: [...this.state.postList, ...postList],
      isLoadMore: false,
    })
  }

  _fetchRecipePerPage = async ($) => {
    try {
      const postListHTML = $('#post-list .post');
      const postList = [];

      postListHTML.map( async (idx, el) => {
        const title       = $('.entry-title a', el).text();
        const link        = $('.entry-title a', el).attr('href');
        const thumb       = $('.entry-image img', el).attr('src');
        const id          = $(el).attr('id').replace('post-', '');
        const date        = $('.entry-date', el).attr('datetime');
        const stringDate  = $('.entry-date', el).text();
        const excerpt     = $('.entry-summary', el).text();

        await postList.push({ title, excerpt, link, thumb, id, date, stringDate })

      })

      return postList;

    } catch (err) {
      console.log(err);
      return null;
    }
  }

  _handleEndOfScroll = () => {
    if(this.state.isLoadMore === false) {
      this.setState({
        isLoadMore: true
      }, async () => {
        this._fethArchive();
      })
    }
  }
  
  render(){
    const { navigation } = this.props;
    const slug = navigation.getParam('slug', 'no-slug')

    if(this.state.isLoading){
      return(
        <ActivityIndicator size="small" />
      )
    }

    return(
      <Wrapper>
        <View style={styles.contentHolder}>
          <ScrollView
            scrollEventThrottle={20}
            onScroll={({nativeEvent}) => {
              if(isCloseToBottom(nativeEvent)){
                  this._handleEndOfScroll();
              }
            }}>
            <FlatList 
              style={styles.listContainer}
              data={ this.state.postList }
              renderItem={({ item, index }) => (
                <RecipeListItem data={ item } navigation={navigation}/>
              )}
            />

            {
              this.state.isLoadMore && <ActivityIndicator size="small"/>
            }
          </ScrollView>
        </View>
      </Wrapper>
    )
  }
}

const styles = new StyleSheet.create({
  listContainer: {
    paddingTop: vars.spacings.l,
  },
  contentHolder: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,
  },
})