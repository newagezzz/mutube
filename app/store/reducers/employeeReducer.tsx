import axios from "axios"
import * as ACTIONS from '../types';
import * as EnvSettings from "../../config/Settings";
import DeviceInfo from 'react-native-device-info';

const initData = {
  status: "INITIAL", 
  employee: null,
  device: null,
}

export default function reducer(state = initData, action: any = {}) {
  switch (action.type) {
    case ACTIONS.PASS_EMPLOYEE:
      console.log("!!!!!!!!!!!!!!!!employeeReducer(PASS_EMPLOYEE)!!!!!!!!!!!!!!!!");
      console.log(action.employee_result);
      console.log("------------------------------------------");
      const stx = action.employee_result.status;
      return {
        ...state,
        status: stx == "LOGINED" || stx == "REGISTED" || stx == "UPDATED" ? "LOGINED" : "NOTLOGINED",
        employee: action.employee_result.employee,
      }
    case ACTIONS.REST_EMPLOYEE:
      console.log("!!!!!!!!!!!!!!!!employeeReducer(REST_EMPLOYEE)!!!!!!!!!!!!!!!!");
      console.log(action.employee_result);
      console.log("------------------------------------------");
      return {
        ...state,
        status: "INITIAL",
        employee: null,
      }
    case ACTIONS.GETT_DEVICE:
      console.log("!!!!!!!!!!!!!!!!userReducer(GET_DEVICE)!!!!!!!!!!!!!!!!");
      console.log(action);
      console.log("------------------------------------------");
      DeviceInfo.getUniqueId()
        .then(devId => {
          console.log("DeviceInfo.getUniqueId succeeded![" + devId + "]");
          return {
            ...state,
            device: devId,
          }
        })
        .catch(error => {
          console.log("DeviceInfo.getUniqueId failed! Refer to below for detail error!");
          console.log(error);
          console.log("--------------------------------------------");
          return {
            ...state,
            device: "empty",
          }
        }) 
    case ACTIONS.PASS_DEVICE:
        console.log("!!!!!!!!!!!!!!!!userReducer(PASS_DEVICE)!!!!!!!!!!!!!!!!");
        console.log(action.device);
        console.log("------------------------------------------");
        return {
          ...state,
          device: action.device,
        }      
    default:
      return state
  }
}
