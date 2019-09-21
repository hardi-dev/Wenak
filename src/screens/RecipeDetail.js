import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Dimensions, Image } from 'react-native';
import { WEB_URL, ARCHIVE_URL, API_URL } from './../helper/constant';
import { generateSlugFromLink } from './../helper/helper';
import axios from 'axios';
import HTML from 'react-native-render-html';
import * as vars from './../styles/vars';
import { loadHTML } from './../helper/scraper';


import Wrapper from './../components/wrapper';
import { AdsBanner } from './../components/Ads';

export default class RecipeDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Detail Resep",
    };
  };

  state = {
    isLoading: true,
    data: []
  }

  componentDidMount(){
    this._detailRecipe();
  }

  _detailRecipe = async () => {
    try {
      const respon = await this._fetchDetailRecipeFromWeb();
      if(respon){
        this.setState({
          data: respon,
          isLoading: false,
        })
      } else {
        this.setState({
          isLoading: false,
          data: []
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  _fetchDetailRecipe = async () => {
    const slug = generateSlugFromLink(this.props.navigation.getParam('link', 'no-link'));
    console.log(slug);
    const URL = `${API_URL}posts?slug=${slug}`;
    return await axios.get(URL);
  }

  _fetchDetailRecipeFromWeb = async () => {
    const $ = await loadHTML(this.props.navigation.getParam('link', 'no-link'));
    $('.code-block').remove();
    $('.wprm-recipe-buttons').remove();
    return await $('article.post .entry-content.single-page').html();
  }

  _onLinkPress = href => {
    console.log(href);
  }

  render(){
    const { navigation } = this.props;
    const link = navigation.getParam('link', 'no-link');

    if(this.state.isLoading){
      return <ActivityIndicator size="small" />
    }

    return(
      <Wrapper>
        <View style={styles.contentHolder}>
          
          <ScrollView>

            <View style={styles.titleContainer}>
              <Image style={styles.hero}source={{uri: navigation.getParam('thumb')}}/>
              <Text style={styles.title}> { navigation.getParam('title') } </Text>
            </View>

            <View style={styles.bannerHolder}>
              <AdsBanner />
            </View>

            <View style={styles.container}>
              <HTML
                tagsStyles={{ 
                  body: {fontSize: 20}, 
                  h2: { fontFamily: vars.fontsPrimary.regular},
                  p: {fontSize: 16, fontFamily: vars.fontsPrimary.regular}, 
                  strong: {fontSize: 20,}, 
                  blockquote: {fontSize: 16}, 
                  a: {fontSize:16, color: "#000"}, 
                  em: {fontSize: 16,}, 
                  img: {height: 250, width: 350},
                  li: { fontFamily: vars.fontsPrimary.regular, fontSize: 16},

                }}
                imagesInitialDimensions={{ width: imgWidth, height: imgWidth }}
                styleName="paper md-gutter multiline" 
                html={ this.state.data }
                imagesMaxWidth={Dimensions.get('window').width} 
                ignoredStyles={['width', 'height', 'video', 'display']}
                onLinkPress={(evt, href) => this._onLinkPress(href)}/>
            </View>
          </ScrollView>
        </View>
      </Wrapper>
    )
  }
}

const { width } = Dimensions.get('window');
const imgWidth = width - (vars.spacings.m * 2);

const styles = new StyleSheet.create({
  titleContainer: {
    width: width,
    height: width,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: vars.spacings.xl
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlignVertical: 'center', 
    fontFamily: vars.fontsPrimary.bold,
    fontSize: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: vars.spacings.m,
    color: 'white'

  },
  hero: {
    width: width,
    height: width
  },
  container: {
    paddingHorizontal: vars.spacings.m,
    paddingBottom: vars.spacings.xxl
  },
  body: {
    fontSize: 14,
  },  
  paragraph: {

  },
  img : {
    width: imgWidth
  },
  contentHolder: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,
  },
  bannerHolder: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vars.spacings.m
  }
})