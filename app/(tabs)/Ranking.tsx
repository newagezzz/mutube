import {Text, View} from 'react-native';
import React from 'react';
import TextTicker from 'react-native-text-ticker'
import axios , { AxiosRequestConfig } from "axios";
import * as EnvSettings from "../config/Settings";

const Ranking = () => {
  console.log("!!!!!!!!!!!!!!!!Ranking!!!!!!!!!!!!!!!!");
  const testApi: any = async ( ) => {
      console.log("!!!!!!!!!!!!!!!!Ranking!!!!!!!!testApi!!!!!!!!");
      const url = EnvSettings.REACT_APP_MUSERVER + "root";
      console.log("url:[" + url + "]");
      await axios.get(url)
        .then((response) => {
          console.log("!!!!!!!!!!!!!!!!Ranking!!!!!!!!response!!!!!!!!");
          console.log(response.data);
          //response.data.items.map((item: any) => itemList = [...itemList, item]);
          //配列名.push(値1[, 値2, ...])
          return(response.data);
        })
        .catch((err) => {
          console.log("!!!!!!!!!!!!!!!!Ranking!!!!!!!!err!!!!!!!!");
          console.log(err);
          console.log("------------------------");
          return(err);
        });
        console.log("!!!!!!!!!!!!!!!!Ranking!!!!!!!!Finish!!!!!!!!");
        /*
      return this.http.get(url)
        .pipe(
          map((response: any) => response.items)
        );
      */
  }

  var resp = testApi() 
  return (
    <View>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Ranking...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
    </View>
  );
};

export default Ranking;
