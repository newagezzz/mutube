/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import React from 'react';
import type {Node} from 'react';
import {ImageBackground, StyleSheet, Button, Pressable, Image, BackHandler , useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';

//-------------
import Colors from './Colors';
//import HermesBadge from './HermesBadge';
//-------------
import { useSelector, useDispatch } from 'react-redux';
import TextTicker from 'react-native-text-ticker'

const Header = (): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const onClickEnd = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Header!!!!!!!!onClickEnd!!!!!!!!");
    evt.preventDefault();
    BackHandler.exitApp();
  };

  const user = useSelector(state => state.userReducer.user);
  const status = useSelector(state => state.employeeReducer.status);
  const employee = useSelector(state => state.employeeReducer.employee);
  const dispatch = useDispatch();
  console.log("------------------------Header-------User-------")
  console.log(user);

  const dispUserInfo = (usr: any) => {
    const msg = usr.name.title + ". " + usr.name.last + ": Welcome to mutube............"
    return (
      <View style={{flexDirection: "row"}}>
        <Image style={{width: 20, height: 20,}} source={{ uri: usr.picture.thumbnail }}/> 
        <View>
          <TextTicker style={[styles.text, { color: isDarkMode ? Colors.white : Colors.black, }, ]} 
                      duration={3000} loop bounce repeatSpacer={100} marqueeDelay={2000}>
            {msg}{msg}{msg}{msg}
          </TextTicker>
        </View>
      </View>
    )
  }
  const dispWaiting = () => {
    return (
      <>
        <Text style={[styles.text, { color: isDarkMode ? Colors.white : Colors.black, }, ]}>
          Waiting......
        </Text>
      </>
    )
  }

  return (
    <View style={{flexDirection: "column"}} >
      <View>
        <Text></Text>
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between",}} >
        {user ? dispUserInfo(user): dispWaiting()}
        {/*
        <Button onPress={onClickEnd} title="×" color="#841584" accessibilityLabel="終了"/>
        */}
        <Pressable onPress={onClickEnd} accessibilityLabel="終了">
          <Text>×</Text>
        </Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    //paddingBottom: 40,
    //paddingTop: 96,
    //paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    //resizeMode: 'cover',
    width: 200, height: 30,
    resizeMode: 'contain',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    //marginLeft: -128,
    marginLeft: 0,
    //marginBottom: -192,
    marginBottom: 0,
  },
  text: {
    //fontSize: 40,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Header;

/*
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('./logo.png')}
      style={[
        styles.background,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
      ]}
      imageStyle={styles.logo}>
      {//<HermesBadge /> 
      }
      <View style={{flexDirection: "row", justifyContent: "space-between",}} >
        {user ? dispUserInfo(user): dispWaiting()}
        <Button onPress={onClickEnd} title="✖" color="#841584" accessibilityLabel="終了"/>
      </View>
    </ImageBackground>
  );
*/
