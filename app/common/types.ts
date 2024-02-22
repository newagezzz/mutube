export type BottomTabParamList = {
    Ranking: undefined;
    Artist: undefined;
    Search: undefined;
    Playlist: undefined;
    Setting: undefined;
  };

export type FuncIcon = {
    funcName: string;
    iconName: string;
    //component: ()=>{};
  };

export type MsgContent = {
    name: string;
    picurl: string;
    message: string;
    confirmed: boolean;
    postat: string;
};

export type UserInfo = {
  name: string;
  age: string;
  sex: string;
  nickname: string;
};

export interface VideoInfo {
  videoId: string;
  videoUrl: string;
  channelId: string;
  channelUrl: string;
  channelTitle: string;
  title: string;
  publishedAt: Date;
  description: string;
  thumbnail: string;
  viewCount: string;
  likeCount: string;
  commentCount:string;
}
