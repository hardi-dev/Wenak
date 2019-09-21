import React from 'react';

import firebase from 'react-native-firebase';
import { ADMOB } from './../helper/constant';
// firebase.admob().initialize(ADMOB.banner);
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export const AdsBanner = () => {
  return (
    <Banner 
      size={'BANNER'}
      unitId={ADMOB.banner}
      request={request.build()}
      onAdLoaded={() => {
        console.log('add loaded');
      }}
    />
  )
}