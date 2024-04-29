import React from 'react';
import {Text, View, ScrollView, TextInput, Button, Pressable, StyleSheet, Image} from 'react-native';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import {MsgContent, UserInfo}  from "../common/types";
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../store/types';
import * as EnvSettings from "../config/Settings";
//import WhiteBoard from '../components/WhiteBoard';

console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!Starting!!!!!!!!");
const socket = io(EnvSettings.REACT_APP_MUSERVER);
console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!Before socket.on(connect))!!!!!!!!");
socket.on("connect", () => {
    console.log(`接続が確立されました!!!`);
    //console.log(socket.connect());
});
socket.on("disconnect", () => {
    console.log(`接続が切断されました!!!`);
});
console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!Ater socket.on(connect))!!!!!!!!");
const updMessageList = ((msgList:MsgContent[], msg: MsgContent) => {

    var msgListX: MsgContent[] = []
    var flg = false
    msgList.map((msgx) => {
        if (msgx.confirmed) {
            msgListX = [...msgListX, msgx]
        } else if (msgx.name == msg.name) {
            msgListX = [...msgListX, msg]
            flg = true
        } else {
            msgListX = [...msgListX, msgx]
        }
    })
    if (!flg) {
        msgListX = [...msgListX, msg]
    }
    //console.log("----msgListX[after setMessageList]-------------");
    //console.log(msgListX);
    return(msgListX)
})

var thisprops = null;

const Wechat = ( props: any ) => {
  console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!!!!!!!!!");
  console.log("---Wechat---props-------")
  console.log(props);
  //console.log("----Wechat--DeviceInfo.getUniqueId-------")
  //console.log(DeviceInfo.getUniqueId());
  console.log("-----Wechat--------")

  thisprops = props;
  //const { user, certificated, userList } = props;
  //const { user } = props.route.params;
  //console.log("------------------------Wechat-------User-------")
  //console.log(user);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [logined, setLogined] = useState(false);
  /*  
  const [deviceId, setDeviceId] = useState('')
  const getdeviceId = async () => {
    var id = await DeviceInfo.getUniqueId();
    setDeviceId(id);
  };
  */
 
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  console.log("------------------------Wechat-------User-------")
  console.log(user);
  /*
  if (user != undefined && user!= null) { 
    setNickname(user.name.first);
  }
  */
  /* */
  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!useEffect!!!!!!!!");
    socket.on("chat", (msg) => {
          console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!socket.on(chat),!!!!!!!!");
          console.log("message received!!!!");
          console.log(msg);
          console.log("----messageList[before setMessageList]-------------");
          console.log(messageList);
          //setMessageList((messageList) => [...messageList, msg]);
          setMessageList((messageList) => updMessageList(messageList, msg));
          //setMessageList([...messageList, msg]);
          //messageList = updMessageList(messageList, msg);
          console.log("----messageList[after setMessageList]-------------");
          console.log(messageList);
          console.log("-------------------------------");
      });
  }, []);
  /* */

  // インプットエリアの文字が変更されたときの処理
  const onChangeMessage = (str: string) => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!onChangeMessage!!!!!!!!");
    console.log(str);
    //console.log("deviceId:[" + deviceId + "]");
    
    const msg = str;
    const date = new Date();
    const msgCont: MsgContent = {
        name: user.name.first,
        picurl: user.picture.thumbnail,
        message: msg,
        confirmed: false,
        postat: date.toLocaleString("ja"),
    };
    console.log(msgCont);
    socket.emit("chat message", msgCont);
    setMessage(str);
  };
  const onChangeUser = (str: string) => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!onChangeUser!!!!!!!!");
    console.log(str);
    setNickname(str);
  };
  // インプットエリアの文字が変更されたときの処理
  const doNothing = (evt: any) => {
      //setMessage(evt.target.value);
  };
  const schChatProc = (evt: any) => {
    //setMessage(evt.target.value);
  };
  const clrInputProc = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!clrInputProc!!!!!!!!");
    setMessageList((messageList) => []);
    setNickname("");
    setLogined(false);
    dispatch({ type: ACTIONS.REST_USER });
  };

  const onClickSend = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!onClickSend!!!!!!!!");

    evt.preventDefault();
    const date = new Date();
    const  msgCont: MsgContent = {
        name: user.name.first,
        picurl: user.picture.thumbnail,
        message: message,
        confirmed: true,
        postat: date.toLocaleString("ja"),
    };
    console.log(msgCont);
    socket.emit("chat message", msgCont);
    setMessage("");
  };
  const onClickLogin = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Wechat!!!!!!!!onClickLogin!!!!!!!!");
    evt.preventDefault();
    if (nickname.length >= 1) {
        setLogined(true);
    }
  };
  const iconName = "music";

  const DispMsg = (index: number, userName: string , msg: MsgContent) => {
    if (userName == msg.name) 
        return(
            //<View key={index} style={{ alignSelf="center" flexDirection: 'row'}}>
            <View key={index} style={{
                paddingVertical: 2,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                //alignItems: "center"
            }}>
                <View></View>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ textAlign: 'right' }}>{msg.message}　{msg.name}</Text>
                    {/*}
                    <Icon name={iconName} color="purple" size={15}/>
                    <Image style={{width: 20, height: 20,}} source={require('../resource/playlist.gif')}/>
                    */}
                    <Image style={{width: 20, height: 20,}} source={{ uri: msg.picurl }}/> 
                </View>
            </View>
        )
    else 
        return(
            <View key={index} style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                {/*
                <Icon name={iconName} color="purple" size={15}/>
                */}
                <Image style={{width: 20, height: 20,}} source={{ uri: msg.picurl }}/> 
                <Text style={{ textAlign: 'left' }}>{msg.name}　{msg.message}</Text>
            </View>
        )
    //<label>{msg.postat}</label>
  }

  const dispChat = (userName: string) => {
    return(
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          {messageList.map((msg, index) => DispMsg(index, userName, msg))}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput id="msginp" style={styles.input} onChangeText={onChangeMessage} onSubmitEditing={onClickSend}
                     value={message} clearButtonMode={'while-editing'} placeholder="Send Message here..." returnKeyType="send" />
          <Button onPress={clrInputProc} title="入力クリア" color="#841584" accessibilityLabel="入力クリア"/>
          {/*
          <Pressable style={styles.button} onPress={clrInputProc}>
            <Text>入力クリア</Text>
          </Pressable>
          */}
        </View>
      </View>
    )
  }
  const dispLogin = () => {
    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <View>
                    <TextInput id="userinp" style={styles.input} onChangeText={setNickname} value={nickname}/>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
                    <Button onPress={onClickLogin} title="ログイン" color="#841584" accessibilityLabel="ログイン"/>
                    <Button onPress={clrInputProc} title="入力クリア" color="#841584" accessibilityLabel="入力クリア"/>
                </View>
            </View>
        </View>
    )
  }  
  return (
    <>
      { user ? dispChat(user.name.first) : dispLogin()}
      {/*<WhiteBoard props={[...props, user]} />*/}
    </>
  )
}
/*
      { logined ? dispChat(nickname) : dispLogin()}
*/
const styles = StyleSheet.create({
    input: {
      height: 30,
      //width: 520,
      margin: 5,
      borderWidth: 1,
      padding: 5,
      backgroundColor: 'rgb(240, 240, 240)',
      color: 'rgb(30, 30, 30)',
      fontSize: 16,
      borderRadius: 2,
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
        height: 40,
        backgroundColor: "lightblue",
        //flexDirection: 'row',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        height: 100,
        backgroundColor: "lightgrey"
    },
    button: {
        height: 30,
        color: "#841584"
    }
});

export default Wechat;
