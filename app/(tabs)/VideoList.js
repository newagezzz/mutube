import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, ImageBackground, Image, Text, View, Alert, Button,  Keyboard, Dimensions, 
         TouchableOpacity, ActivityIndicator, Linking, Pressable } from "react-native";
import MediaInfo from '../components/VideoList/MediaInfo';
import SearchVideo from "../components/VideoList/Search";
import * as EnvSettings from "../config/Settings";
import YoutubePlayer from "react-native-youtube-iframe";
//import Playing from "./Playing";
//import ytdl from "react-native-ytdl";
//import ytdl from "ytdl-core";
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_HEIGHT = Dimensions.get('window').height;
let pageURL = "";
let searchString = "";

const Item = ({ item, onPress, style, styleT }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={[styles.title, styleT]}>{item.title}</Text>
  </TouchableOpacity>
);
let flatListRef = null;

const VideoList = () => {
  console.log("!!!!!!!!!!!!!!!!VideoList!!!!!!!!!!!!!!!!");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");
  const [selectedVideoDesc, setSelectedVideoDesc] = useState("");
  const [selectedVideoChannel, setSelectedVideoChannel] = useState("");

  //Play Video...........
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  //Play Video...........

  useEffect(() => {
    if (loadedData.length > 0) {
      let idx = loadedData.findIndex(({ id }) => id === selectedId);
      setSelectedVideoTitle(loadedData[idx].title);
      setSelectedVideoDesc(loadedData[idx].desc);
      setSelectedVideoChannel(loadedData[idx].channel);
    }
  }, [loading, selectedId])


  const errorAlert = () =>
    Alert.alert(
      "Search Error",
      "No records found for this search",
      [
        {
          text: "Retry",
          onPress: () => loadVideoList(searchString)
        },
        {
          text: "OK", onPress: () => console.log("Error: OK Pressed"),
          style: "default"
        }
      ],
      { cancelable: false }
    );

  const scroll = (idx) => {
    if (idx) {
      flatListRef.scrollToIndex({ animated: true, index: idx });
    }
  };

  const loadVideoList = async (inputText) => {
    if (inputText !== "" && inputText !== undefined) {
      searchString = inputText;
      setLoading(true);
      pageURL = EnvSettings.YTURL + inputText;
      console.log("!!!!!!!!!!!!!!!!loadVideoList!!!!!!!!!!!!!!!");
      console.log(pageURL);
      console.log("------------------------------------------");      
      await fetch(pageURL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
        .then(response => response.json())
        .then((res) => {
          setNextPage(res.nextPageToken);
          if (res.items.length > 0) {
            Keyboard.dismiss();
            let newList = [];
            res.items.forEach((resItem) => {
              newList.push({ id: resItem.id.videoId, title: resItem.snippet.title, desc: resItem.snippet.description, channel: resItem.snippet.channelTitle });
            })
            setLoadedData(newList);
            //console.log("Initial LIST", newList)
            setSelectedVideoTitle(newList[0].title);
            setSelectedVideoDesc(newList[0].desc);
            setSelectedVideoChannel(newList[0].channel);
            setSelectedId(newList[0].id);
          } else {
            setLoadedData([]);
            setSelectedVideoTitle("");
            setSelectedVideoDesc("");
            setSelectedVideoChannel("");
            errorAlert();
            setSelectedId(null);
            setSelectedIndex(0)
          }
        })
        .catch(err => {
          console.error;
          errorAlert();
        });
      setLoading(false);
    } else {
      setLoadedData([]);
      setSelectedVideoTitle("");
      setSelectedVideoDesc("");
      setSelectedVideoChannel("");
      setSelectedId(null);
      setSelectedIndex(0)
    }
  }

  const loadMore = async () => {
    await fetch(pageURL + EnvSettings.YTPAGE + nextPage, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(response => response.json())
      .then((res) => {
        if (res.items.length > 0) {
          setNextPage(res.nextPageToken);
          let newList = loadedData;
          res.items.forEach((resItem) => {
            newList.push({ id: resItem.id.videoId, title: resItem.snippet.title, desc: resItem.snippet.description, channel: resItem.snippet.channelTitle });
          })
          setLoadedData(newList);
          console.log("Next page LIST", newList)
        } else {
          setNextPage(null);
        }
      })
      .catch(err => {
        console.error;
        errorAlert();
      });
  }

  const onEndReached = () => {
    if (nextPage) {
      loadMore();
    }
  }

  const onRefresh = () => {
    setLoading(true);
    loadVideoList(searchString);
    setLoading(false);
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "rgb(197, 0, 0)" : "rgb(240, 240, 240)";
    const color = item.id === selectedId ? "rgb(240, 240, 240)" : "rgb(30, 30, 30)";
    const borderColor = "rgb(240, 240, 240)";
    const borderBottomColor = "rgb(210, 210, 210)";
    //console.log("!!!!!!!!!!!!!!!!VideoList!!!!!!!!renderItem!!!!!!!!");
    //console.log(item)
    //console.log("-----------------------------");
    return (
      <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 0 }}>
        <Image
          source={{ uri: `${EnvSettings.YTIMGURL}${item.id}/hqdefault.jpg` }}
          style={{
            width: '20%',
            height: 80,
            borderRadius: 5,
          }} />
        {/*
        <ImageBackground
          source={{ uri: `${EnvSettings.YTIMGURL}${item.id}/hqdefault.jpg` }}
          style={{ width: 20, height: 80, borderRadius: 5,}} >
          <View style={{flexDirection: "row", justifyContent: "space-between",}} >
            <Icon name="music" color="purple" size={25}/>
            <Icon name="film" color="purple" size={25}/>
          </View>
        </ImageBackground>
        */}  
        <Item
          item={item}
          index={index}
          onPress={() => { setSelectedId(item.id); setSelectedIndex(index); }}
          style={{ borderColor, backgroundColor, borderBottomColor, width: '75%', height: 80 }}
          styleT={{ color }}
        />
        <View style={{ flexDirection: "column", alignContent: "center" }}>
          <Icon name="music" color="purple" size={25} onPress={()=> {downloadAV(item.id, "AUDIO")}}/>
          <Icon name="film" color="purple" size={25}  onPress={()=> {downloadAV(item.id, "VIDEO")}}/>
          {/*
          <Pressable style={styles.button} onPress={() => downloadAV(item.id, "AUDIO")}>
            <Text>Audio</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => downloadAV(item.id, "VIDEO")}>
            <Text>Video</Text>
          </Pressable>
          */}
        </View>
      </View>
    );
  };

  //Play Video...........
  const PlayVideo = (vId) => {
    console.log("!!!!!!!!!!!!!!!!VideoList!!!!!!!!PlayVideo!!!!!!!!");
    console.log(vId)
    console.log("-----------------------------");
    if (vId == null || vId == "") {
      //do nothing
      return "";
    } else {
      console.log("------PlayVideo--Playing-------------------");
      return (
        <View style={styles.container}>
          <YoutubePlayer
            height={180} width={320}
            play={playing}
            videoId={vId}
            onChangeState={onStateChange}
          />
          <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
       </View> 
      )
    }
  }
  //Play Video...........
  //Download Video...........
  const downloadAV = async (vId, vAV) => {
    console.log("!!!!!!!!!!!!!!!!VideoList!!!!!!!!downloadAV!!!!!!!!");
    console.log(vId, vAV)
    console.log("-----------------------------");

    Keyboard.dismiss();
    if (vId == null || vId == "") {
      Alert.alert("Error", "Video ID is not valid. Please try again later.....", [
        { text: "OK", onPress: () => "" },
      ]);
    } else {
      const youtubeURL = EnvSettings.YTDLDURL + vId;
      const basicInfo = await ytdl.getBasicInfo(youtubeURL);
      const title = basicInfo.player_response.videoDetails.title;
      const videoUrls = await ytdl(youtubeURL, { quality: "highestaudio" });
      const audioUrls = await ytdl(youtubeURL, {
        quality: "highestaudio",
        filter: "audioonly",
        format: "m4a",
      });
      const videoFinalUri = videoUrls[0].url;
      const audioFinalUri = audioUrls[0].url;
      console.log("-------------youtubeURL----------------");
      console.log(youtubeURL)
      console.log("-------------basicInfo----------------");
      console.log(basicInfo)
      console.log("-------------title----------------");
      console.log(title)
      console.log("-------------videoUrls----------------");
      console.log(videoUrls)
      console.log("-------------audioUrls----------------");
      console.log(audioUrls)
      console.log("-------------videoFinalUri----------------");
      console.log(videoFinalUri)
      console.log("-------------audioFinalUri----------------");
      console.log(audioFinalUri)
      console.log("-----------------------------");
  
      Alert.alert(
        "Link Generated",
        "Link has been generated, tap download now to download video",
        [{ text: "OK", onPress: () => "" }]
      );
      if (vAV == "VIDEO") {
        //setYtVideoLink(videoFinalUri + "&title=" + title);
        const ytVideoLink = videoFinalUri + "&title=" + title;
        Linking.openURL(ytVideoLink)
      } else {
        //setYtAudioLink(audioFinalUri + "&title=" + title);
        const ytAudioLink = audioFinalUri + "&title=" + title;
        Linking.openURL(ytAudioLink)
      }
    }
  };
  //Download Video...........


  return (
    <View style={styles.videolist}>
      {(PlayVideo(selectedId))}
      <View style={styles.videoarea}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="rgb(228, 29, 62)" />
          </View>
        ) : (
            <View style={styles.playvideo}>
              <FlatList style={styles.searchlist}
                data={loadedData}
                renderItem={renderItem}
                ref={(ref) => flatListRef = ref}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                extraData={selectedId}
                onEndReachedThreshold={1}
                onEndReached={onEndReached}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                  />
                }
              />
              <MediaInfo scroll={scroll} selectedIndex={selectedIndex} selectedId={selectedId} selectedVideoTitle={selectedVideoTitle} selectedVideoDesc={selectedVideoDesc} selectedVideoChannel={selectedVideoChannel} />
            </View>
          )
        }
        <SearchVideo onSearchVideo={loadVideoList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videolist: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    width: '100%',
  },
  videoarea: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    paddingTop: '80%',
  },
  item: {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    textAlign: 'left'
  },
  searchlist: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    padding: 10,
    zIndex: 200,
    width: '100%',
    height: SCREEN_HEIGHT / 2.5
  },
  playvideo: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    width: '100%',
    height: '40%',
    overflow: 'hidden',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  playing: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
});

export default VideoList;
