import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import Wrapper from './../components/wrapper';
import { WEB_URL, ADMOB } from './../helper/constant';
import { loadHTML } from './../helper/scraper';
import * as vars from './../styles/vars';

import RecipeHorizontalList from '../components/RecipeHorizontalList';

import firebase from 'react-native-firebase';

// firebase.admob().initialize(ADMOB.banner);
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();


export default class Home extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      // title: "Resep Wenak",
      headerTitle: "Resep Wenak",
      headerStyle: {
        borderBottomWidth: 0,
        marginBottom:10,
      },
      headerTitleStyle: {
        fontFamily: vars.fontsPrimary.bold,
        textAlign: 'center'
      },
    };
  };

  state = {
    isLoading: true,
    resepDaging : [],
    resepSate: [],
    resepNasi: [],
    resepSayuran: [],
    resepDissert: [],
    resepKue: []
  }

  componentDidMount(){
    this._fetchFeaturedRecipe();
  }

  _fetchFeaturedRecipe = async () => {
    const $ = await loadHTML(WEB_URL);
    const resepDaging = await this._fetchRecipeBySection($, 3);
    const resepSate = await this._fetchRecipeBySection($, 3);
    const resepNasi = await this._fetchRecipeBySection($, 7, 0);
    const resepSayuran = await this._fetchRecipeBySection($, 7, 1);
    const resepDissert = await this._fetchRecipeBySection($, 7, 2);
    const resepKue = await this._fetchRecipeBySection($, 7, 3);

    this.setState({ resepDaging, resepSate, resepNasi, resepSayuran, resepDissert, resepKue, isLoading: false })
  }

  _fetchRecipeBySection = async ($, position, childPoisition = null) => {
    const parents = $('#content > div > div > div > div').eq(position);
    let recipes = null;

    if( childPoisition === null ) {
      recipes = $('.post-item', parents);
    } else {
      const child = $('.col.medium-6.small-12.large-6', parents).eq(childPoisition);
      recipes = $('.post-item', child);
    }

    const data = [];
    recipes.map(async (idx, el) => {
      const title = $('.post-title', el).text();
      const thumb = $('.wp-post-image', el).attr('src');
      const link = $('a', el).attr('href');
      await data.push({title, thumb, link});
    });
    return data;
  }

  render(){
    const { navigation } = this.props;

    if(this.state.isLoading){
      return(
        <ActivityIndicator size="small"/>
      )
    }
    return(
      <Wrapper>
        <ScrollView>
          <Banner 
            unitId={ADMOB.banner}
            request={request.build()}
            onAdLoaded={() => {
              console.log('add loaded');
            }}
            />


          <RecipeHorizontalList 
            title="Resep Daging" 
            data={this.state.resepDaging}
            slug="daging"
            navigation={navigation}/>

          <RecipeHorizontalList 
            title="Resep Nasi" 
            data={this.state.resepNasi}
            slug="nasi"
            navigation={navigation}/>  

          <RecipeHorizontalList 
            title="Resep Sayuran" 
            data={this.state.resepSayuran}
            slug="sayuran"
            navigation={navigation}/>   

          <RecipeHorizontalList 
            title="Resep Dissert" 
            data={this.state.resepDissert}
            slug="dissert"
            navigation={navigation}/>  

          <RecipeHorizontalList 
            title="Resep Kue" 
            data={this.state.resepKue}
            slug="kue"
            navigation={navigation}/>            
        </ScrollView>
      </Wrapper>
    )
  }
}