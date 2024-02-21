import {Text, View} from 'react-native';
import React from 'react';
import {MsgContent, UserInfo}  from "../common/types";
import TextTicker from 'react-native-text-ticker'
import { useSelector, useDispatch } from 'react-redux';

//const Setting = () => {
const Setting = (props: any) => {
  console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!!!!!!!!!");
  console.log("------props-------")
  console.log(props);
  console.log("-------------")

  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  console.log("------------------------Wechat-------User-------")
  console.log(user);

  //thisprops = props;

  return (
    <View>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Setting...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>

    </View>
  );
};

export default Setting;
