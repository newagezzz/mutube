// Environtment variable import
import Config from 'react-native-config';
import { Platform } from 'react-native';
import * as SECRET from "../secret"

const API_KEY = SECRET.YOUTUBE_API_KEY
const MUSERVER_GCP = SECRET.MUSERVER_GCP_URL
const YTMAXRECORDS = 50;
const YTSORTBY = "title";
const YTTYPE = "video"
const MUSERVER_LOCAL_EMU="http://10.0.2.2:8088/"
const MUSERVER_LOCAL_WEB="http://localhost:8088/"
const MUTUBE_MODE="release"
export const YTPAGE = "&pageToken=";
export const YTURL = `https://youtube.googleapis.com/youtube/v3/search?&part=snippet&order=${YTSORTBY}&type=${YTTYPE}&key=${API_KEY}&maxResults=${YTMAXRECORDS}&q=`;
export const YTIMGURL = `https://i.ytimg.com/vi/`;
export const YTDLDURL = "https://www.youtube.com/watch?v="
export const RANDOM_USER_API = "https://randomuser.me/api/"
export const isAndroid: boolean = Platform.OS === 'android';
export const isIos: boolean = Platform.OS === 'ios';
export const isWeb: boolean = Platform.OS === 'web';

// Add more platform-specific checks or configurations as needed.
// Access environment-specific configurations
//var varUrl = isWeb ? process.env.REACT_APP_MUSERVER : Config.REACT_APP_MUSERVER;
var varUrl = "";
if (MUTUBE_MODE == "release") {
    varUrl = MUSERVER_GCP;
} else if (MUTUBE_MODE == "debug") {
    if (isWeb) {
        varUrl = MUSERVER_LOCAL_WEB;
    } else {
        varUrl = MUSERVER_LOCAL_EMU;
    }
}
export const REACT_APP_MUSERVER = varUrl ? varUrl : "http://localhost:8088";
console.log("!!!!!!!!!!!!!!config/Settings!!!!!!!!!!!!!!!!!");
console.log("-----------isWeb:[" + isWeb + "]!!!!!!!!!!!!!!!!!");
console.log("-----------process.env.REACT_APP_MUSERVER:[" + process.env.REACT_APP_MUSERVER + "]!!!!!!!!!!!!!!!!!");
console.log("-----------Config.REACT_APP_MUSERVER:[" + Config.REACT_APP_MUSERVER + "]!!!!!!!!!!!!!!!!!");
console.log("-----------REACT_APP_MUSERVER:[" + REACT_APP_MUSERVER + "]!!!!!!!!!!!!!!!!!");
console.log("-----------------------------------------------");
