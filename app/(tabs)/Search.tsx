import React, { useState, useEffect } from "react";
import {Text, View, ScrollView, StyleSheet, TextInput, Button} from 'react-native';
import TextTicker from 'react-native-text-ticker'
import {MsgContent, UserInfo, VideoInfo}  from "../common/types";
import {YoutubeSearch, srchByKeyword, srchByRanking}  from "../common/srchYoutube";

const Search = () => {
  console.log("!!!!!!!!!!!!!!!!Search!!!!!!!!!!!!!!!!");
  const [videoList, setVideoList] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [keyword, setKeyword] = useState("");
  const clrInputProc = () => {

  }
  
  const onClickSrch = async (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Search!!!!!!!!onClickSrch!!!!!!!!");
    evt.preventDefault();
    if (keyword.length >= 3) {
        //setVideoList(srchByRanking(keyword));
        var varLst: any[] = [];
        //const vlst = await srchByKeyword(keyword, varLst)
        //const vlst = await srchByKeyword(keyword)
        const vlst = await YoutubeSearch(keyword)
        console.log("!!!!!!!!!!!!!!!!Search!!!!!!!!varLst!!!!!!!!");
        console.log(varLst);
        console.log("!!!!!!!!!!!!!!!!Search!!!!!!!!vlst!!!!!!!!");
        console.log(vlst);
        setVideoList(vlst);
    }
    console.log("!!!!!!!!!!!!!!!!Search!!!!!!!!VideoList!!!!!!!!");
    console.log(videoList);
    console.log("-----------------------------");
  };
  
  const SearchX = () => {
    return (
      <View>
        {TextTickers("Search...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!",  10)} 
      </View>
    );
  };
  
  const DispVideo = (index: number, video: any) => {
    return(
      <View key={index} style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
        <Text style={{ textAlign: 'left' }}>{video.etag}</Text>
      </View>
    )
  }

  const DispVideoList = () => {
    if (videoList === void 0) {
      //do nothing
      return ("");
    } else {
      return (
          <>
            { videoList.map((video, index) => DispVideo(index, video)) }
          </>
      )
    }
    //return ("");
  }
  //{videoList.map((video, index) => DispVideo(index, video))}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        { DispVideoList() }
      </ScrollView>
      <View style={{ flexDirection: 'row'}}>
        <TextInput id="keywordinp" style={styles.input} onChangeText={setKeyword} value={keyword}/>
        <Button onPress={onClickSrch} title="検索" color="#841584" accessibilityLabel="検索"/>
        <Button onPress={clrInputProc} title="入力クリア" color="#841584" accessibilityLabel="入力クリア"/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 20,
    color: "#841584"
    //width: 320,
    //margin: 12,
    //borderWidth: 1,
    //padding: 10,
  },
  container: {
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between',
      backgroundColor: '#F5FCFF',
  },
  titleWrapper: {

  },
  inputWrapper: {

  },
  body: {
      flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
      height: 100,
      backgroundColor: "lightblue"
  },
  bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      height: 100,
      backgroundColor: "lightgrey"
  }     
});

export default Search;

