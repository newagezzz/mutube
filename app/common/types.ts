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

export interface Point {
  x: number;
  y: number;
};

export interface LineInfo {
  name: string;
  color: string;
  points: Point[];
  confirmed: boolean;
}

export interface HolidayInfo {
  date: string;
  name: string;
  type: string;
}

export interface WorkDay {
  day_kbn: string;
  month_day: string;
  week_day: string;
  employee_id: string;
  work_ymd: string;
  work_ym: string;
  from_time: string;
  to_time: string;
  work_time: number;
  comment: string;
  holiday_name: string;
}
export interface WorkSummary {
  employee_id: string;
  work_ym: string;
  eigyo_nissu: number;
  shukkin_nissu: number;
  kekkin_nissu: number;
  jiddo_nissu: number;
  jiddo_jikan: number;
  input_confirmed: boolean;
  leader_confirmed: boolean;
  manager_confirmed: boolean;
  comment: string;
}

export const InitWorkSummary: WorkSummary =  {
  employee_id: "",
  work_ym: "",
  eigyo_nissu: 0.0,
  shukkin_nissu:  0.0,
  kekkin_nissu:  0.0,
  jiddo_nissu:  0.0,
  jiddo_jikan:  0.0,
  input_confirmed: false,
  leader_confirmed: false,
  manager_confirmed: false,
  comment: "",
}

export const InitWorkDay: WorkDay =  {
  day_kbn: "",
  month_day: "",
  week_day: "",
  employee_id: "",
  work_ymd: "",
  work_ym: "",
  from_time: "",
  to_time: "",
  work_time: 0.0,
  comment: "",
  holiday_name: ""
}

export interface WorkMonth {
  year_month: string;
  ins_upd_kbn: string;
  work_day_list: WorkDay[];
  work_summary: WorkSummary;
}
export const InitWorkMonth: WorkMonth =  {
  year_month: "",
  ins_upd_kbn:  "",
  work_day_list: [],
  work_summary: InitWorkSummary,
}
