import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import TextTicker from 'react-native-text-ticker'

export default function TabOneScreen() {
  console.log("!!!!!!!!!!!!!!!!TabOneScreen!!!!!!!!!!!!!!!!");
  return (
    <View>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Index...Index...Index...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Index...Index...Index...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Index...Index...Index...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Index...Index...Index...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
