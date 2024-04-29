import React, { useState, useRef, useEffect } from 'react';
import {Text, View, GestureResponderEvent, PointerEvent, Button, StyleSheet, Pressable } from 'react-native';
import {MsgContent, UserInfo, Point, LineInfo }  from "../common/types";
import TextTicker from 'react-native-text-ticker'
import { useSelector, useDispatch } from 'react-redux';
import Svg, { Polyline, Rect } from "react-native-svg";
import { ColorPicker } from 'react-native-color-picker'; 
import { TriangleColorPicker, toHsv  } from 'react-native-color-picker'; 
//import ColorPalette from 'react-native-color-palette'
import io from "socket.io-client";
import * as ACTIONS from '../store/types';
import * as EnvSettings from "../config/Settings";

const socket = io(EnvSettings.REACT_APP_MUSERVER);
console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!Before socket.on(connect))!!!!!!!!");
socket.on("connect", () => {
    console.log(`接続が確立されました!!!`);
    //console.log(socket.connect());
});
socket.on("disconnect", () => {
    console.log(`接続が切断されました!!!`);
});
console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!Ater socket.on(connect))!!!!!!!!");

const WhiteBoard = (props: any) => {
  console.log("!!!!!!!!!!!!!!!!WhiteBoard!!!!!!!!!!!!!!!!");
  //console.log("------props-------")
  //console.log(props);
  //console.log("-------------")

  //const user = useSelector(state => state.userReducer.user);
  //const dispatch = useDispatch();
  const {user} = props;
  console.log("------------------------Setting-------User-------")
  console.log(user);

  //thisprops = props;
 
  // 描画中の線分の点情報を配列で保持する
  const [points, setPoints] = useState<Point[]>([]);
  const [line, setLine] = useState({});
  const [lineList, setLineList] = useState<LineInfo[]>([]);
  const [mouseDown, setMouseDown] = useState(false);

  const updLineList = ((lineList: LineInfo[], line: LineInfo) => {
    //console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!updLineList!!!!!!!!");

    var lineListX: LineInfo[] = []
    var flg = false
    lineList.map((linex) => {
        if (linex.confirmed) {
          lineListX = [...lineListX, linex]
        } else if (linex.name == line.name) {
            lineListX = [...lineListX, line]
            flg = true
        } else {
          lineListX = [...lineListX, linex]
        }
    })
    if (!flg) {
      lineListX = [...lineListX, line]
    }
    //console.log("----msgListX[after setMessageList]-------------");
    //console.log(msgListX);
    return(lineListX)
  })  

  useEffect(() => {
    //console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!useEffect!!!!!!!!");
    socket.on("draw", (line) => {
          //console.log("!!!!!!!!!!!!!!!!Setting!!!!!!!!socket.on(chat),!!!!!!!!");
          //console.log("line received!!!!");
          //console.log(line);
          //console.log("----messageList[before setMessageList]-------------");
          //console.log(lineList);
          setLineList((lineList) => updLineList(lineList, line));
          //console.log("----lineList[after setLineList]-------------");
          //console.log(lineList);
          //console.log("-------------------------------");
      });
  }, []);

  const onTouchMove = (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onTouchMove!!!!!!!!!!!!!!!!");
    const { locationX, locationY, touches } = event.nativeEvent;
    if (touches.length === 1) {
      // 描画中の線分の情報を追加する
      setPoints([...points, { x: locationX, y: locationY }]);
    }
  };

  const onTouchEnd = async (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onTouchEnd!!!!!!!!!!!!!!!!");
    if (points.length > 0) {
      /* TODO: ここでFireStoreにpolylineドキュメントを追加する処理 */

      const line: LineInfo = {
          name: user.name.first,
          color: color,
          points: points,
          confirmed: true,
      };
      console.log(line);
      socket.emit("draw line", line);
      // 描画中の線分の情報をクリア
      setPoints([]);
    }
  } 
  const onTouchStart = async (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onTouchStart!!!!!!!!!!!!!!!!");
    if (points.length > 0) {
      /* TODO: ここでFireStoreにpolylineドキュメントを追加する処理 */

      // 描画中の線分の情報をクリア
      setPoints([]);
    }
  }
  const onTouchCancel = async (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onTouchCancel!!!!!!!!!!!!!!!!");
    if (points.length > 0) {
      /* TODO: ここでFireStoreにpolylineドキュメントを追加する処理 */

      // 描画中の線分の情報をクリア
      setPoints([]);
    }
  }

  const onPointerDown = async (event: PointerEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onPointerDown!!!!!!!!!!!!!!!!");
    setMouseDown(true);
    if (points.length > 0) {
      /* TODO: ここでFireStoreにpolylineドキュメントを追加する処理 */
      // 描画中の線分の情報をクリア
      setPoints([]);
    }
  }
  const onPointerUp = async (event: PointerEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onPointerUp!!!!!!!!!!!!!!!!");
    setMouseDown(false);
    if (points.length > 0) {
      /* TODO: ここでFireStoreにpolylineドキュメントを追加する処理 */
      const line: LineInfo = {
          name: user.name.first,
          color: color,
          points: points,
          confirmed: true,
      };
      console.log(line);
      socket.emit("draw line", line);
      // 描画中の線分の情報をクリア
      setPoints([]);
    }

  }
  const onPointerEnter = async (event: PointerEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onPointerEnter!!!!!!!!!!!!!!!!");
    //console.log(event);
    //console.log("----------------------------")
  }
  const onPointerMove = async (event: PointerEvent) => {
    if (mouseDown) {
      //console.log("!!!!!!!!!!!!!!!!onPointerMove!!!!!!!!!!!!!!!!");
      //console.log(event);
      //console.log("----------------------------")
 
      const { clientX, clientY, screenX, screenY } = event.nativeEvent;
      //if (touches.length === 1) {
      // 描画中の線分の情報を追加する
      setPoints([...points, { x: clientX, y: clientY }]);
      //}
    }
  }

  const onPointerLeave = async (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onPointerLeave!!!!!!!!!!!!!!!!");
  }
  const onPress = async (event: GestureResponderEvent) => {
    //console.log("!!!!!!!!!!!!!!!!onPress!!!!!!!!!!!!!!!!");
  }

  const dispLine = (line: any, index: any) => {
    var varStr = "";
    line.points.map((point: Point) => varStr = varStr + " " + point.x + "," + point.y);
    varStr = varStr.substring(1);
    return (
      <Polyline key={index} 
        points={varStr}
        fill="none"
        //stroke="#f00"
        stroke={line.color}
        strokeWidth="1"
     />
    )
  }

  const clrLines = () => {
    setLineList([]);
    setPoints([]);
  }

  const height = 600;
  const width = 600;

  //const [color, setColor] = useState(toHsv('green'));
  const [color, setColor] = useState('red');

  function onColorChange(color: any) {
    setColor( color );
  }

  const colorPickerRef = useRef(null); 
  
  const handleColorSelected = (color: any) => { 
      // Copy the color to the clipboard 
      //Clipboard.setString(color); 
      // Alert the user 
      alert(`Color selected: ${color} (Copied to clipboard)`); 
  }; 

  const dispColor = (color:any , index:any) => {
    return (
      <Pressable key={index} style={{backgroundColor: color[0]}} onPress={() => setColor(color[0])}>
        <Text>{color[0]}</Text>
      </Pressable>
    );
  }

  const dispColorList = () => {
    const colorList = [["aqua","#00ffff"], ["blue","#0000ff"], ["magenta","#ff00ff"], ["crimson","#dc143c"],
                       ["fuchsia","#ff00ff"], ["green","#008000"], ["orangered","#ff4500"], ["lime","#00ff00"],  
                       ["red","#ff0000"]
                      ];
    return(
      <View>
        {colorList.map((color, index) => dispColor(color, index))}
      </View>
    )
  }

  return (
    <View style={styles.overlay}>
      <View pointerEvents="auto"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <Svg 
              height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          {/* 背景 */}
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            stroke="#000"
            strokeWidth="1"
            fill="#fff"
            opacity="0.0"
            //style="fill-opacity: .25;"
          />
          {/* 線 */}
          {lineList.map((line, index) => dispLine(line, index))}
          {dispLine({color: color, points: points}, 1)}
        </Svg>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }} fill-opacity="0.0">
        {dispColorList()}
        <Button onPress={clrLines} title="クリア" color="#841584" accessibilityLabel="クリア"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
      flex: 1, 
      backgroundColor: '#f5f5f5', 
      alignItems: 'center', 
      justifyContent: 'center', 
  }, 
  title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 20, 
  }, 
  colorPicker: { 
      width: 300, 
      height: 500, 
      borderRadius: 10, 
      marginBottom: 20, 
  }, 
  input: { 
      color: 'black', 
      fontWeight: 'bold', 
      fontSize: 20, 
  }, 
  overlay: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
    top: 0, 
    right: 0,
    width: '100%',
  }
}); 

/*

          <ColorPicker 
            ref={colorPickerRef} 
            onColorSelected={handleColorSelected} 
            style={styles.colorPicker} 
          /> 
        <TriangleColorPicker
          oldColor="purple"
          color={color}
          onColorChange={onColorChange}
          onColorSelected={(color) => alert(`Color selected: ${color}`)}
          onOldColorSelected={(color) => alert(`Old color selected: ${color}`)}
          style={{ flex: 1 }}
        />


<View onPress={(e: GestureResponderEvent) => ...}>

On the Web, I further use e.nativeEvent which is of the type PointerEvent, and I use layerX, layerY which give me exactly numbers I need.




  return (
    <View>
      <TextTicker style={{ fontSize: 24 }} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
        Setting...!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!!!!Under Construction!!!
      </TextTicker>

    </View>
  );
};
  const BoardScreen = (height: any, width: any) => {
    <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            stroke="#000"
            strokeWidth="1"
            fill="#fff"
          />
          <Polyline
            points="99.5,151.5 104.5,151.5 119,153.5 135,156 167.5,161 194.5,164.5 218,167.5 236,171 244.5,174.5 249,176 255.5,180 260.5,183.5 267,185.5 271,187.5 274.5,189 276.5,190 277.5,190.5 279,192 279.5,192 281.5,193 283,195.5"
            fill="none"
            stroke="#f00"
            strokeWidth="3"
          />
    </Svg>
  } ;
*/
//export Point;
export default WhiteBoard;
