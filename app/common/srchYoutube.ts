// search.service.ts
import axios , { AxiosRequestConfig } from "axios";

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';
//old....const API_TOKEN = 'AIzaSyDqoco0hwCd1JsKKYyd42FOBnDafychgLM';
const API_TOKEN = "AIzaSyApbeG0-_2qH4xKmOl8YrKhhq9m5M8hLfE";

export const YoutubeSearch: any = async (keyword: string) => {
  console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!YoutubeSearch!!!!!!!!");
  try {
    // console.log(keyword);
    const url = `${API_SEARCH_URL}?key=${API_TOKEN}&q=${keyword}&part=snippet&type=video&videoCategoryId=10&order=viewCount&maxResults=10`;
    console.log("url:[" + url + "]");

    const config: AxiosRequestConfig = {
      url: API_SEARCH_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      params: {
        part: 'snippet',
        q: keyword,
        maxResults: 50,
        key: API_TOKEN  // 取得したAPIキーを設定
      }
    }
    const res = await axios(config);
    console.log("!!!!!!!!!!!!!!!!YoutubeSearch!!!!!!!!items!!!!!!!!");
    console.log(res.data.items);
    return res.data.items;
  } catch (error) {
    throw (error);
  }
};

export const srchByKeywordX = async (query: string) => {
//export const srchByKeyword = (query: string) => {
  console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!srchByKeyword!!!!!!!!");
  const url = `${API_SEARCH_URL}?key=${API_TOKEN}&q=${query}&part=snippet&type=video&videoCategoryId=10&order=viewCount&maxResults=10`;
  console.log("url:[" + url + "]");
  return(await axios.get(url));
  /*
  return this.http.get(url)
    .pipe(
      map((response: any) => response.items)
    );
  */
}
//var itemList: any = [];

export const srchByKeywordY = async (query: string, itemList: any[]) => {
  //export const srchByKeyword = (query: string) => {
    console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!srchByKeyword!!!!!!!!");
    const url = `${API_SEARCH_URL}?key=${API_TOKEN}&q=${query}&part=snippet&type=video&videoCategoryId=10&order=viewCount&maxResults=10`;
    console.log("url:[" + url + "]");
    await axios.get(url)
      .then((response) => {
        console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!response!!!!!!!!");
        console.log(response);
        //response.data.items.map((item: any) => itemList = [...itemList, item]);
        //配列名.push(値1[, 値2, ...])
        response.data.items.map((item: any) => itemList.push(item));
        console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!itemList!!!!!!!!");
        console.log(itemList);
        return(itemList);
      })
      .catch((err) => {
        console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!err!!!!!!!!");
        console.log(err);
        console.log("------------------------");
        return(err);
      });
      console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!Finish!!!!!!!!");
      /*
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
    */
  }

export const srchByKeyword: any = async (query: string) => {
    //export const srchByKeyword = (query: string) => {
      console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!srchByKeyword!!!!!!!!");
      const url = `${API_SEARCH_URL}?key=${API_TOKEN}&q=${query}&part=snippet&type=video&videoCategoryId=10&order=viewCount&maxResults=10`;
      console.log("url:[" + url + "]");
      await axios.get(url)
        .then((response) => {
          console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!response!!!!!!!!");
          console.log(response);
          //response.data.items.map((item: any) => itemList = [...itemList, item]);
          //配列名.push(値1[, 値2, ...])
          return(response.data.items);
        })
        .catch((err) => {
          console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!err!!!!!!!!");
          console.log(err);
          console.log("------------------------");
          return(err);
        });
        console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!Finish!!!!!!!!");
        /*
      return this.http.get(url)
        .pipe(
          map((response: any) => response.items)
        );
      */
}

export const srchByRanking = (query: string) => {
  console.log("!!!!!!!!!!!!!!!!SrchYoutube!!!!!!!!srchByRanking!!!!!!!!");
  const url = `${API_SEARCH_URL}?key=${API_TOKEN}&part=snippet,statistics&chart=mostPopular&videoCategoryId=10&maxResults=10`;
  console.log("url:[" + url + "]");

  axios.get(url)
    .then((response) => {
      return(response.data.items);
    })
    .catch((err) => {
      return(err);
    });
  /*
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  */
}

/*
var url = BASE_URL + "/user/" + userid + "/" + password;
console.log(url)
axios.get(url)
  .then((response) => {
    var {status} = response.data;
    if (status == "LOGINED") {
      dispatch({type: "USER_LOGIN_SUCCEEDED", payload: response.data.user})
    } else {
      dispatch({type: "USER_LOGIN_FAILED", payload: {}})
    }
  })
  .catch((err) => {
    dispatch({type: "USER_LOGIN_FAILED", payload: err})
  });
};
*/
