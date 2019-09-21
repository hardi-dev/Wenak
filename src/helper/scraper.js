import axios from 'axios';
import cheerio from 'react-native-cheerio';

export const loadHTML = async url => {
  try {
    const reponse = await axios.get(url);
    return cheerio.load(reponse.data);
  } catch (err){
    return err;
  }
}