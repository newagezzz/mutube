import {Text, View, SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import React  , { useState, useCallback, useRef }  from 'react';
import TextTicker from 'react-native-text-ticker'
//import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";

const Playlist = () => {
  console.log("!!!!!!!!!!!!!!!!Playlist!!!!!!!!!!!!!!!!");

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={270} width={480}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View> 
  )
};

/*
<View style={styles.container}>
      {TextTickers("Playlist...Playlist...Playlist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!",  10)} 
    </View>
  );

<View style={styles.container}>
      {TextTickers("Playlist...Playlist...Playlist...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!",  10)} 
    </View>


import YouTube from 'react-native-youtube';
...
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <YouTube
        videoId="KVZ-P-ZI6W4"
        apiKey="YOUR_YOUTUBE_DEVELOPER_API_KEY_FOR_ANDROID"
        play={true}
        fullscreen={false}
        loop={false}
        onReady={(e) => console.log('onReady')}
        onChangeState={(e) => console.log('onChangeState:', e.state)}
        onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
        onError={(e) => console.log('onError: ', e.error)}
        style={{width: '100%', height: 300}}
      />
    </SafeAreaView>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Playlist;
