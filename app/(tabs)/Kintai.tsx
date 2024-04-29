import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, ScrollView, TextInput } from 'react-native';
import TextTicker from 'react-native-text-ticker'
import axios , { AxiosRequestConfig } from "axios";
import * as EnvSettings from "../config/Settings";
import { format } from 'date-fns'
import { ja } from 'date-fns/locale' // 変更
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../components/TableComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HolidayInfo, WorkDay, WorkMonth, WorkSummary, InitWorkDay, InitWorkMonth, InitWorkSummary }  from "../common/types";
import { Alert, Button, Modal} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { EmployeeLoginAction, EmployeeLogoutAction, EmployeeRegistAction } from "../store/actions/employeeAction"
import * as ACTIONS from '../store/types';
import { TextInput as TextInputPaper, Button as ButtonPaper } from 'react-native-paper';
//import DeviceInfo from 'react-native-device-info';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
//import KeyboardSpacer from 'react-native-keyboard-spacer';

const Kintai = () => {
  console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!!!!!!!!!");
  const today = new Date(); 

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  //const [workdays, setWorkdays] = useState<string[][]>([]);
  const [workmonth, setWorkmonth] = useState<WorkMonth>({...InitWorkMonth});
  const [changed, setChanged] = useState(false);
  const [deviceAuth, setDeviceAuth] = useState(false);
  const device = useSelector(state => state.employeeReducer.device);
  const status = useSelector(state => state.employeeReducer.status);
  const employee = useSelector(state => state.employeeReducer.employee);
  const dispatch = useDispatch();
  const {
    register,
    control, 
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
        employee_id: "",
        password: "",
        password_cnf: "",
        nickname: "",
        name_kanji: "",
        name_kana: "",
        name_alpha: "",
        email_address: "",
        mobile_no: "",
        wechat_id: "",
        company: "",
        team: "",
      },
  });    

  console.log("------------------------Kintai-------employee-------begin")
  console.log("Status:[" + status + "],Device:[" + device + "]");
  console.log(employee);
  console.log("------------------------Kintai-------employee-------end")


  const isValidDevice = (devId: any) =>  {
    if (devId == null) {
      return(false);
    }
    if (devId == "") {
      return(false);
    }
    if (devId == "unknown") {
      return(false);
    }
    if (devId == "empty") {
      return(false);
    }
    if (devId == "dummy") {
      return(false);
    }
    if (devId.length <= 8) {
      return(false);
    }
    return(true);
  }

  if (status != "LOGINED") {
    if (isValidDevice(device) && !deviceAuth) {
      EmployeeLoginAction(dispatch, "-", "-", device);
    }
  } else if (employeeId == "" || password == "") {
    setEmployeeId(employee.employee_id);
    setPassword(employee.password);
  }

  const CallHolidayAPI = async (HolidayApiUrl: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!CallHolidayAPI!!!!!!!!");
    console.log("url:[" + HolidayApiUrl + "]");
    try {
      const resp = await axios.get(HolidayApiUrl);
      return resp.data;
    } catch(err) {
      return err;
    }
  }

  const GetHolidays = (year:any, month:any) => {
    const url = EnvSettings.GET_HOLIDAY_API +  ("20" + year).slice(-4) + "-" +  ("0" + month).slice(-2);
    //const holidays = CallHolidayAPI(url);
    const holidays = axios.get(url)
      .then( response => response.data)
      .catch(err => []);
    return holidays;
  }

  const GetWorkTimes = (employee_id:any, year:any, month:any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!GetWorkTimes!!!!!!!!");
    const yyyymm = ("20" + year).slice(-4) + ("0" + month).slice(-2);
    const url = EnvSettings.REACT_APP_MUSERVER + "work_time/onemonth/" + employee_id + "/" + yyyymm;
    const promise = axios.get(url)
      .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }

  const InsWorkSummary = (reqBody: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!InsWorkSummary!!!!!!!!");
    console.log(reqBody);
    console.log("-------------------------------------------")
    const url = EnvSettings.REACT_APP_MUSERVER + "work_summary";
    const promise = axios.post(url, reqBody)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }
  const UpdWorkSummary = (employee_id: any, work_ym: any, reqBody: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!UpdWorkSummary!!!!!!!!");
    const url = EnvSettings.REACT_APP_MUSERVER + "work_summary/" + employee_id + "/" + work_ym;
    const promise = axios.put(url, reqBody)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }
  const DelWorkSummaryMonth = (employee_id: any, work_ym: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!DelWorkSummary!!!!!!!!");
    const url = EnvSettings.REACT_APP_MUSERVER + "work_summary/onemonth/" + employee_id + "/" + work_ym;
    const promise = axios.delete(url)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }
  const InsWorkDay = (reqBody: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!InsWorkDay!!!!!!!!");
    console.log(reqBody);
    console.log("-------------------------------------------")
    const url = EnvSettings.REACT_APP_MUSERVER + "work_time";
    const promise = axios.post(url, reqBody)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }
  const UpdWorkDay = (employee_id: any, work_ymd: any, reqBody: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!UpdWorkDay!!!!!!!!");
    const url = EnvSettings.REACT_APP_MUSERVER + "work_time/" + employee_id + "/" + work_ymd;
    const promise = axios.put(url, reqBody)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }
  const DelWorkTimeMonth = (employee_id: any, work_ym: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!DelWorkDayMonth!!!!!!!!");
    const url = EnvSettings.REACT_APP_MUSERVER + "work_time/onemonth/" + employee_id + "/" + work_ym;
    const promise = axios.delete(url)
    .then( response => response.data)
      .catch(err => []);
    return(promise);  
  }

  const daysOfMonth = (year: any, month: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!daysOfMonth!!!!!!!!");
    console.log("[" + year + "-" + month + "]");
    let firstDay = new Date(year, month - 1, 1); 
    let lastDay = new Date(year, month, 0); 
    console.log("[" + firstDay + "][" + lastDay + "]");
    let nowDay = firstDay;
    let idxDay = 1;
    let arr: WorkDay[] = [];
    while (nowDay <= lastDay) {
      const dtStr = format(nowDay, 'MM月dd日,E,yyyyMMdd,yyyyMM', {locale: ja})
      let tmp = dtStr.split(",");
      let workday: WorkDay = {...InitWorkDay};
      workday.employee_id = employeeId;
      workday.month_day = tmp[0];
      workday.week_day = tmp[1];
      workday.work_ymd = tmp[2];
      workday.work_ym = tmp[3];
      if (tmp[1] == "土" || tmp[1] == "日") {
         workday.day_kbn = tmp[1];
      } else {
        workday.day_kbn = "平日";
        workday.from_time = "09:00";
        workday.to_time = "18:00";
        workday.work_time = 8.0;
      }
      arr = [...arr, workday];
      idxDay = idxDay + 1;
      nowDay.setDate(idxDay)
    }
    return(arr);
  }

  const getPromiseResult = async (promise: any) => {
    let arr: any = null;
    await Promise.all([promise])
    .then(result => arr = result[0])
    .catch(err => { });
    console.log("↓↓↓↓↓↓async getPromiseResult!!!!!!!!");
    console.log(arr);
    console.log("↑↑↑↑↑↑async getPromiseResult!!!!!!!!");
    return(arr);
  }

  const convWorkTimes = (wkTimes: any[]) => {
    console.log("↓↓↓↓↓↓convWorkTimes!!!begin!!!!!");
    console.log(wkTimes);
    console.log("--------------------------------------------");
    let arr: WorkDay[] = [];
    wkTimes.map((wkTime) => {
      let workday: WorkDay = {...InitWorkDay};
      let {seq, ...wkTime1} = wkTime;
      workday = Object.assign(workday, wkTime1);
      let yyyy = wkTime.work_ymd.substring(0,4) 
      let mm = wkTime.work_ymd.substring(4,6) 
      let dd = wkTime.work_ymd.substring(6,8) 
      let nowDay = new Date(yyyy, mm - 1, dd);
      let dtStr = format(nowDay, 'MM月dd日,E', {locale: ja})
      let tmp = dtStr.split(",");
      workday.month_day = tmp[0];
      workday.week_day = tmp[1];
      if (tmp[1] == "土" || tmp[1] == "日") {
        workday.day_kbn = tmp[1];
      } else {
        workday.day_kbn = "平日";
      }
      arr = [...arr, workday];
    })
    return(arr);
  }

  const setupWorkMonth = async (employee_id: any, year: any, month: any) => {
    console.log("!!!!!!!setupWorkDays!!!!!!!!!start!!!!!!!!");
    const wkTimes = await getPromiseResult(GetWorkTimes(employee_id, year, month));
    console.log("↓↓↓↓↓↓async setupWorkDays!!!wkTimes!!!!!");
    console.log(wkTimes);
    console.log("↑↑↑↑↑↑async setupWorkDays!!!wkTimes!!!!!");
    const holidays = await getPromiseResult(GetHolidays(year, month));
    console.log("↓↓↓↓↓↓async setupWorkDays!!!holidays!!!!!");
    console.log(holidays);
    console.log("↑↑↑↑↑↑async setupWorkDays!!!holidays!!!!!");

    let wkMonth: WorkMonth = {...InitWorkMonth};
    wkMonth.year_month =  ("20" + year).slice(-4) + ("0" + month).slice(-2);
    let wkDays: WorkDay[] = []
    if (wkTimes.status == "FOUND") {
      wkMonth.ins_upd_kbn = "UPD";
      wkDays = convWorkTimes(wkTimes.work_time)
      holidays.map((holiday: HolidayInfo) => {
        let idx = Number(holiday.date.slice(-2)) - 1;
        wkDays[idx].day_kbn = holiday.type;
        wkDays[idx].holiday_name = "<" + holiday.name + ">";
      })
    } else {
      wkMonth.ins_upd_kbn = "INS";
      wkDays = daysOfMonth(year, month)
      holidays.map((holiday: HolidayInfo) => {
        let idx = Number(holiday.date.slice(-2)) - 1;
        wkDays[idx].day_kbn = holiday.type;
        wkDays[idx].from_time = "";
        wkDays[idx].to_time = "";
        wkDays[idx].work_time = 0.0;
        wkDays[idx].holiday_name = "<" + holiday.name + ">";
      })
    }
    wkMonth.work_day_list = wkDays;
    wkMonth.work_summary = {...InitWorkSummary};
    calcWorkSummary(wkDays, wkMonth.work_summary);
   
    console.log("↓↓↓↓↓↓setupWorkDays!!!wkMonth!!!!!");
    console.log(wkMonth);
    console.log(wkMonth.work_summary);
    console.log("↑↑↑↑↑↑setupWorkDays!!!wkMonth!!!!!");
    setWorkmonth(wkMonth);
    setChanged(false);
  }

  const regWorkTime = async () => {
    if (changed) {
      let promiseArr: any[] = [];
      if (workmonth.ins_upd_kbn == "INS") {
        const {...wsReqBody} = workmonth.work_summary;
        promiseArr.push(InsWorkSummary(wsReqBody));
      } else {
        const {employee_id, work_ym, ...wsReqBody} = workmonth.work_summary;
        promiseArr.push(UpdWorkSummary(employee_id, work_ym, wsReqBody));
      }
      workmonth.work_day_list.map((workday) => {
        if (workmonth.ins_upd_kbn == "INS") {
          //const reqBody: {employee_id: any, work_ymd: any, work_ym: any, from_time: any, to_time: any, work_time: any, comment: any} = workday;
          const {day_kbn, month_day, week_day, holiday_name, ...wdReqBody} = workday;
          promiseArr.push(InsWorkDay(wdReqBody));

        } else {
          //const reqBody: {employee_id: any, work_ymd: any, work_ym: any, from_time: any, to_time: any, work_time: any, comment: any} = workday;
          const {day_kbn, month_day, week_day, employee_id, work_ymd, holiday_name, ...wdReqBody} = workday;
          promiseArr.push(UpdWorkDay(employee_id, work_ymd, wdReqBody));
        }
      })
      let arr: any[] = [];
      await Promise.all(promiseArr)
        .then(result => {
           arr = result;
           setChanged(false);
           workmonth.ins_upd_kbn = "UPD";
          })
        .catch(err => { });
      console.log("↓↓↓↓↓↓async regWorkTime!!!result!!!!!");
      console.log(arr);
      console.log("↑↑↑↑↑↑async regWorkTime!!!result!!!!!");
      return(arr);
    }
  }

  const delWorkTime = async () => {
    let promiseArr: any[] = [];
    if (workmonth.ins_upd_kbn == "UPD") {
      const {employee_id, work_ym, ...wsReqBody} = workmonth.work_summary;
      promiseArr.push(DelWorkSummaryMonth(employee_id, work_ym));
      promiseArr.push(DelWorkTimeMonth(employee_id, work_ym));
    }
    let arr: any[] = [];
    await Promise.all(promiseArr)
      .then(result => {
        arr = result;
      })
      .catch(err => { });
    console.log("↓↓↓↓↓↓async delWorkTime!!!result!!!!!");
    console.log(arr);
    console.log("↑↑↑↑↑↑async delWorkTime!!!result!!!!!");
    setChanged(false);
    setupWorkMonth(employeeId, year, month);
    return(arr);
  }

  const cnfWorkTime = async (cfn: any) => {
    if (!changed) {
      let promiseArr: any[] = [];
      if (workmonth.ins_upd_kbn == "UPD") {
        const {employee_id, work_ym} = workmonth.work_summary;
        let wkReqBody = {input_confirmed: true, leader_confirmed: true, manager_confirmed: true};
        if (cfn == "INPUT") {
          wkReqBody.leader_confirmed = false;
          wkReqBody.manager_confirmed = false;
        } else if (cfn == "LEADER") {
          wkReqBody.manager_confirmed = false;
        }
        promiseArr.push(UpdWorkSummary(employee_id, work_ym, wkReqBody));
      }
      let arr: any[] = [];
      await Promise.all(promiseArr)
        .then(result => arr = result)
        .catch(err => { });
      console.log("↓↓↓↓↓↓async cfnWorkTime!!!result!!!!!");
      console.log(arr);
      console.log("↑↑↑↑↑↑async cfnWorkTime!!!result!!!!!");
      setChanged(false);
      return(arr);
    }
  }

  const prevMonth = () => {
    let yyyy = year;
    let mm = month;
    if (mm > 1) {
      mm = mm - 1;
    } else {
      mm = 12;
      yyyy = yyyy - 1;
    }
    setYear(yyyy);
    setMonth(mm);
    setupWorkMonth(employee.employee_id, yyyy, mm);
    setChanged(false);
  }

  const nextMonth = () => {
    let yyyy = year;
    let mm = month;
    if (mm < 12) {
      mm = mm + 1;
    } else {
      mm = 1;
      yyyy = yyyy + 1;
    }
    setYear(yyyy);
    setMonth(mm);
    setupWorkMonth(employee.employee_id, yyyy, mm);
    setChanged(false);
  }
 
  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!useEffect!!!!!!!!!!!!!!!!!");
    /*
    DeviceInfo.getUniqueId()
      .then(devId => {
        console.log("DeviceInfo.getUniqueId succeeded![" + devId + "]");
        setDeviceId(devId)
      })
      .catch(error => {
        console.log("DeviceInfo.getUniqueId failed! Refer to below for detail error!");
        console.log(error);
        console.log("--------------------------------------------");
        setDeviceId("empty");
      }) 
    */
    console.log("-----------------------------------------");
  }, []);

  const calcTime = (frTime: any, toTime: any) => {
    let time1 = Number(frTime.substring(0,2)) * 60 + Number(frTime.slice(-2)) 
    let time2 = Number(toTime.substring(0,2)) * 60 + Number(toTime.slice(-2)) 
    let timex = time2 - time1;
    if (timex > 240) {
      timex = timex - 60
    }
    return(Number((timex / 60).toFixed(1)))
  }

  const cutString = (str1: string, str2: string ) => {
    if (str2.length) {
      return(str1.replace(str2, '').trim())
    } else { 
      return(str1.trim());
    } 
  }

  const calcWorkSummary = (workdays: WorkDay[], workSummary: WorkSummary) => {
    workdays.map((workday: WorkDay) => {
      workSummary.jiddo_jikan += Number((workday.work_time /1.0 ).toFixed(1));
      workSummary.jiddo_nissu += Number((workday.work_time / 8.0).toFixed(1)); 
      if (workday.work_time > 0 ) {
        workSummary.shukkin_nissu += 1.0;
      }
      if (workday.day_kbn == "平日") { 
        workSummary.eigyo_nissu += 1;
      }
      if (workSummary.eigyo_nissu > workSummary.jiddo_nissu) {
        workSummary.kekkin_nissu = Number((workSummary.eigyo_nissu - workSummary.jiddo_nissu).toFixed(1));
      }
    })
  };
     
  const chgTimeCmt = (rInd: any, item: any, str: any) => {
    const arrx = workmonth.work_day_list.concat();
    switch (item) {
      case "from_time":
          arrx[rInd].from_time  = str;
          arrx[rInd].work_time = calcTime(arrx[rInd].from_time,arrx[rInd].to_time);
          break;
      case "to_time":
        arrx[rInd].to_time  = str;
        arrx[rInd].work_time = calcTime(arrx[rInd].from_time,arrx[rInd].to_time);
        break;
      default:
        arrx[rInd].comment  = cutString(str, arrx[rInd].holiday_name);
    }
    const workSummary: WorkSummary = {...InitWorkSummary};
    
    calcWorkSummary(arrx, workSummary);
    workSummary.employee_id = employeeId;
    workSummary.work_ym = workmonth.year_month;
    const wkMonth: WorkMonth = {year_month: workmonth.year_month, ins_upd_kbn: workmonth.ins_upd_kbn, work_day_list: arrx, work_summary: workSummary};
    setWorkmonth(wkMonth);
    setChanged(true);
  } 

  const inpTime = (dayKbn: any, cellData: any, rInd: any, item: any) => {
    return (
      <TextInput style={dayKbn=="平日" ? styles.input : styles.input_red }  value={cellData} onChangeText={ (str: string ) => chgTimeCmt(rInd, item, str)} textAlign={'center'} />
    )
  }

  const setKintaiStatus = (rInd: any, cInd: any) => {
    console.log('!!!!!!!!!!!!!!!setKintaiStatus!!!!!!!!!!!!!!!!!!!!!!!!');
      Alert.alert('勤務状態選択', '勤務状態を選択してください', [
        { text: '通常勤務',
          onPress: () =>
            console.log('通常勤務'),
        },
        {
          text: '平日残業',
          onPress: () =>
            console.log('平日残業'),
        },
        {
          text: '休日勤務',
          onPress: () =>
            console.log('休日勤務'),
        },
        {
          text: '有給休暇',
          onPress: () =>
            console.log('有給休暇'),
        },
        {
          text: '振替休暇',
          onPress: () =>
            console.log('振替休暇'),
        },
        {
          text: 'Cancel',
          onPress: () =>
            console.log('アラートのcancelをタップした時の挙動を書く'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('アラートのOKをタップした時の挙動を書く'),
        },
      ]);
  }  

  const dispHoliday = (holiday: any, dayKbn: any) => {
    if (holiday.length) {
      return ( 
        <Text style={dayKbn=="平日" ? styles.input : styles.input_red } >{holiday}</Text>
      )
    }
  }
  const inpCmnt = (dayKbn: any, holiday: any, comment: any, rInd: any, item: any) => {
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row'}} >
        <TextInput style={dayKbn=="平日" ? styles.input : styles.input_red } value={holiday + comment} 
          onChangeText={ (str: string ) => chgTimeCmt(rInd, item, str)} />
        <TouchableOpacity onPress={() => setKintaiStatus(rInd, item)}>
          <Text style={dayKbn=="平日" ? styles.input : styles.input_red } >...</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onClickLogin = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!onClickLogin!!!!!!!!");
    evt.preventDefault();
    if (isValidDevice(device)) {
      EmployeeLoginAction(dispatch, employeeId, password,device);
    } else {
      EmployeeLoginAction(dispatch, employeeId, password,"");
    }
  };

  const onClickLogout = (evt: any) => {
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!onClickLogout!!!!!!!!");
    evt.preventDefault();
    EmployeeLogoutAction(dispatch);
  };

  const zerox = (worktime: any) => {
    return (Number(worktime) == 0 ? "" : Number(worktime).toFixed(1));
  }

  const tblHeaderDtl = ["勤務日","曜日","始業","終業","時間","備考"];
  const tblHeaderSum = ["営業日","出勤日","欠勤日","実働日数","実働時間","備考"];
  //const tblDetailSum = ["22","20","2","18.5","180.0","---"];

  const dispKintai = (employee: any) => {
    if (workmonth.year_month == "") {
      setupWorkMonth(employee.employee_id, year, month);
    }
    const tblDetailSum = [workmonth.work_summary.eigyo_nissu.toFixed(0), 
                          workmonth.work_summary.shukkin_nissu.toFixed(0),
                          workmonth.work_summary.kekkin_nissu.toFixed(1),
                          workmonth.work_summary.jiddo_nissu.toFixed(1),
                          workmonth.work_summary.jiddo_jikan.toFixed(1),
                          workmonth.work_summary.comment
                         ];
    return (
      <View style={{ justifyContent: 'space-evenly', flexDirection: 'column'}}>
        <View>
          <View style={{ justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <Text></Text>
            <TouchableOpacity onPress={() => prevMonth()}>
              <Text style={styles.PrevNext}>⇐先月</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => delWorkTime()}>
              <Text style={styles.PrevNext}>削除</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => regWorkTime()}>
              <Text style={ changed ? styles.text_red : styles.text} >{year}年{month}月</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={ changed || workmonth.ins_upd_kbn == "INS" } onPress={() => cnfWorkTime("INPUT")}>
              <Text style={styles.PrevNext}>確定</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nextMonth()}>
              <Text style={styles.PrevNext}>来月⇒</Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
          <View style={styles.overlay}>
            <TouchableOpacity onPress={onClickLogout}>
              <Text>{employee.nickname}さん</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.dataWrapper} showsVerticalScrollIndicator={true}> 
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row data={tblHeaderDtl} flexArr={[2, 1, 1, 1, 1, 3]} style={styles.head} textStyle={styles.text} />
            { workmonth.work_day_list.map((rowData, rInd) => (
              <TableWrapper key={rInd} style={ rInd%2 ? styles.row0 : styles.row1}>
                <Cell data={rowData.month_day} style={{flex: 2}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
                <Cell data={rowData.week_day} style={{flex: 1}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
                <Cell data={inpTime(rowData.day_kbn, rowData.from_time, rInd, "from_time")} 
                  style={{flex: 1}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
                <Cell data={inpTime(rowData.day_kbn, rowData.to_time, rInd, "to_time")} 
                  style={{flex: 1}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
                <Cell data={zerox(rowData.work_time)} style={{flex: 1}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
                <Cell data={inpCmnt(rowData.day_kbn, rowData.holiday_name, rowData.comment, rInd, "comment")} 
                  style={{flex: 3}} textStyle={ rowData.day_kbn == "平日" ? styles.text : styles.text_red}/>
              </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row data={tblHeaderSum} flexArr={[2, 1, 1, 1, 1, 3]} style={styles.head} textStyle={styles.text} />
            <Row data={tblDetailSum} flexArr={[2, 1, 1, 1, 1, 3]} style={styles.row0} textStyle={styles.text} />
          </Table>
        </View>
      </View>
    );
  };

  const tblHeaderInp = ["項目","入力","備考"];
  const tblDetailInp = [["ID","employee_id","no"],
                        ["Password","password","yes"],
                        ["Password(確認)","password_cnf","yes"],
                        ["愛称","nickname","no"],
                        ["氏名","name_kanji","no"],
                        ["フリガナ","name_kana","no"],
                        ["英字名","name_alpha","no"],
                        ["メール","email_address","no"],
                        ["携帯電話","mobile_no","no"],
                        ["Wechat","wechat_id","no"],
                        ["会社","company","no"],
                        ["チーム","team","no"]];

  const chgItem = (item: any, str: any) => {
    //todo something
  }

  const onBlur = () => {
    //todo somethine
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!onBlur!!!!!!!!");
  }
  const onChange = () => {
    //todo somethine
    console.log("!!!!!!!!!!!!!!!!Kintai!!!!!!!!onChange!!!!!!!!");
  }
  
  const inpItem = (item_id: any, item_name: any,  kbn: any) => {
    //<TextInput onChangeText={ (str: string ) => chgItem(item, str)} />
    return (
      <>
        <Controller
          name={item_id}
          control={control}
          rules={{
              required: item_name + "は必須です。",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                  placeholder=""
                  numberOfLines={1}
                  style={styles.textInput}
                  autoCapitalize='none'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
              />
          )}
        />
      </>
    )
  }

  const dispError = (item_id: any) => {
    return(
      <>
        {errors[item_id] && <Text style={styles.errorMessage}>{errors[item_id].message}</Text>}
      </>
    )
  }

  const onClickClear = () => {

  }
  /*
  const onSubmit = (data) => {
    console.log("---Login---onSubmit-------")
    console.log(thisprops);
    console.log(data);
    thisprops.dispatch(userLogIn(data));
  }
  */
  const onSubmit = (data: any) => {
    console.log("---RegUser---onSubmit-------")
    console.log(data);
    const dtStr = format(today, 'yyyyMMdd', {locale: ja})
    let {password_cnf, ...reqBody} = data;
    reqBody = {...reqBody, "from_date": dtStr, "to_date": "99999999", "permission" : "member"};
    if (isValidDevice(device)) {
      reqBody = {...reqBody, "device" : device};
    }
    EmployeeRegistAction(dispatch, reqBody);
  }

  /*
  const onSubmit = (data) => {
    const api_url = 'apiのURL';
    fetch(api_url, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeURI(`name=${data.name}&email=${data.email}&body=${data.body}`)
    })
        .then((response) => response.json())
        .then((result) => alert(result.message))
        .catch((error) => alert(error.message))
}
*/
  const dispLogin = () => {
    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <TextInputPaper id="idinp" mode='outlined' label="employee_id" style={styles.input} onChangeText={setEmployeeId} value={employeeId}/>
                    <TextInputPaper id="pwdinp" mode='outlined' label="password" secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password}/>
                    <ButtonPaper mode="contained" compact disabled={employeeId.length < 5 || password.length < 3} onPress={onClickLogin}>ログイン</ButtonPaper>
                </View>
                <ScrollView style={styles.dataWrapper} showsVerticalScrollIndicator={true}> 
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={tblHeaderInp} flexArr={[2, 4, 4]} style={styles.head_em} textStyle={styles.text} />
                    { tblDetailInp.map((rowData, rInd) => (
                      <TableWrapper key={rInd} style={ rInd%2 ? styles.row0_em : styles.row1_em}>
                        <Cell data={rowData[0]} style={{flex: 2}} />
                        <Cell data={inpItem(rowData[1], rowData[0], "inp")} style={{flex: 4}} />
                        <Cell data={dispError(rowData[1])}  style={{flex: 4}} />
                      </TableWrapper>
                      ))
                    }
                  </Table>
                  <View style={{ justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <ButtonPaper mode="contained" onPress={handleSubmit(onSubmit)}>登録</ButtonPaper>
                    <ButtonPaper mode="contained" onPress={onClickClear}>クリア</ButtonPaper>
                  </View>
                </ScrollView>
            </View>
        </View>
    )
  }    

  return (
    <>
      { status == "LOGINED" ? dispKintai(employee) : dispLogin()}
    </>
  )
}
export default Kintai;

const styles = StyleSheet.create({
  WorkTimeChanged: {
    color: 'red',
  },
  PrevNext: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  container: { 
    flex: 1, 
    flexGrow: 1, 
    height: "100%",
    width: "100%",
    padding: 16, 
    paddingTop: 5, 
    backgroundColor: '#fff' 
  },
  menu_container: {
     flex: 1,
     flexDirection: "column",
   },
  head: { height: 20, backgroundColor: '#f1f8ff', flexDirection: 'row' },
  row: { height: 18, backgroundColor: '#E7E6E1' },
  row0: { height: 20, backgroundColor: '#E7E6E1', flexDirection: 'row' },
  row1: { height: 20, backgroundColor: '#F7F6E7', flexDirection: 'row' },
  head_em: { height: 30, backgroundColor: '#f1f8ff', flexDirection: 'row' },
  row0_em: { height: 30, backgroundColor: '#E7E6E1', flexDirection: 'row' },
  row1_em: { height: 30, backgroundColor: '#F7F6E7', flexDirection: 'row' },
  row_workday: { height: 18, backgroundColor: '#E7E6E1' },
  row_saturday: { height: 18, backgroundColor: '#E7E6E1' },
  row_holiday: { height: 18, backgroundColor: '#E7E6E1' },
  text: { textAlign: "center" },
  text_red: { textAlign: "center", color: "red" },
  dataWrapper: { marginTop: -1 },
  flex_1: { flex: 1, backgroundColor: '#f6f8fa' },
  flex_2: { flex: 1, backgroundColor: '#f6f8fa' },
  input: {flex: 1 } ,
  input_red: { flex: 1, color: 'red' },
  body: { flex: 1 },  
  overlay: {
    flexDirection: 'row',
    position: 'absolute',
    //zIndex: -100,
    top: 0, 
    left: 0,
    //width: '100%',
  },
  Content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
      fontWeight: "bold",
      paddingBottom: 10,
      paddingTop: 60,
  },
  formWrapper: {
      width: 300,
  },
  textInput: {
      //backgroundColor: "#00000011",
      //paddingHorizontal: 5,
      //height: 30,
      //marginVertical: 10,
  },
  textArea: {
      backgroundColor: "#00000011",
      paddingHorizontal: 5,
      height: 60,
      marginVertical: 10,
  },
  errorMessage: {
      marginBottom: 15,
      fontSize: 10,
      color: "red",
  },
  submitBtn: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#00000033",
      height: 50,
  },  
});
/*
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                      <Row data={tblHeaderInp} flexArr={[2, 4, 4]} style={styles.head} textStyle={styles.text} />
                      { tblDetailInp.map((rowData, rInd) => (
                        <TableWrapper key={rInd} style={ rInd%2 ? styles.row0 : styles.row1}>
                          <Cell data={rowData[0]} style={{flex: 2}} />
                          <Cell data={inpItem(rowData[1], "inp")} style={{flex: 4}} />
                          <Cell data="" style={{flex: 4}} />
                        </TableWrapper>
                        ))
                      }
                    </Table>
                    <ButtonPaper mode="contained" compact onPress={handleSubmit(onSubmit)}>登録</ButtonPaper>
                    <ButtonPaper mode="contained" compact onPress={onClickClear}>クリア</ButtonPaper>
                  </form>


<ButtonPaper mode="contained" compact onPress={onClickRegUser}>登録</ButtonPaper>
                    <ButtonPaper mode="contained" compact onPress={onClickClrUser}>クリア</ButtonPaper>

  rowData.slice(-6).map((cellData: any, cInd: any) => (
                    <Cell key={cInd} data={cInd===2 || cInd===3 ? inpTime(rowData[0], cellData, rInd, cInd) : cInd===5 ? inpCmnt(rowData[0], cellData, rInd, cInd) : cellData} 
                          style={cInd===0 ? {flex: 2} : cInd===5 ? {flex: 3} : {flex: 1}} textStyle={ rowData[0] == "平日" ? styles.text : styles.text_red}/>
                  ))


onPress={() => setKintaiStatus(rInd, cInd)}>
                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}

widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
        <Rows data={daysOfMonth(year, month)} widthArr={[2, 1, 1, 1, 1, 3]} style={styles.row} />
      <View style={styles.container} >

<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tblHeader} style={styles.head} textStyle={styles.text}/>
          <Rows data={daysOfMonth(year, month)} textStyle={styles.text}/>
        </Table>

        <Text>{moment(date, "MM-YYYY")}</Text>

import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <SafeAreaView>
      <Text>Month Year Picker Example</Text>
      <Text>{moment(date, "MM-YYYY")}</Text>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
    </SafeAreaView>
  );
};

export default App;
*/