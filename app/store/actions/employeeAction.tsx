import axios from "axios"
import * as ACTIONS from '../types/index';
import * as EnvSettings from "../../config/Settings";
import DeviceInfo from 'react-native-device-info';

const initData = {
  employee_result: {status: "INITIAL", employee: null}
}

export const LoadEmployeeAction = async (dispatch: any) => {
  console.log("!!!!!!!!!!!!!!!!LoadEmployeeAction!!!!!!!!!!!!!!!!");
  // axiosでのAPIコール
  await axios
    .get(EnvSettings.REACT_APP_MUSERVER + "employees")
    .then(res => res.data)
    .then(employee_result => {
      console.log("!!!!!!!!!!!!!!!!employeeAction(LoadEmployee)!!!!!!!!!!!!!!!!");
      console.log(employee_result);
      console.log("------------------------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: employee_result})
      return (employee_result);
    })
    .catch((err) => {
      console.log("!!!!!!!!!!!!!!!!LoadEmployee!!!!!!!!err!!!!!!!!");
      console.log(err);
      console.log("------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: {stauts: "NOTFOUND", employee: null}})
      return(null);
    });
  }

export const EmployeeDevAuthAction = async (dispatch: any, device: any) => {
  console.log("!!!!!!!!!!!!!!!!EmployeeDevAuthAction!!!!!!!!!!!!!!!!");
  // axiosでのAPIコール
  await axios
    .get(EnvSettings.REACT_APP_MUSERVER + "employee/-/-/" + device)
    .then(res => res.data)
    .then(employee_result => {
      console.log("!!!!!!!!!!!!!!!!EmployeeDevAuthAction(EmployeeLogin)!!!!!!!!!!!!!!!!");
      console.log(employee_result);
      console.log("------------------------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: employee_result})
      return (employee_result);
    })
    .catch((err) => {
      console.log("!!!!!!!!!!!!!!!!EmployeeDevAuthAction!!!!!!!!err!!!!!!!!");
      console.log(err);
      console.log("------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: {status: "NOTLOGINED", employee: null}})
      return(null);
    });
  }
      
export const EmployeeLoginAction = async (dispatch: any, employee_id: any, password: any, device: any) => {
  console.log("!!!!!!!!!!!!!!!!EmployeeLoginAction!!!!!!!!!!!!!!!!");
  // axiosでのAPIコール
  await axios
    .get(EnvSettings.REACT_APP_MUSERVER + "employee/" + employee_id + "/" + password + "/" + device)
    .then(res => res.data)
    .then(employee_result => {
      console.log("!!!!!!!!!!!!!!!!EmployeeLoginAction(EmployeeLogin)!!!!!!!!!!!!!!!!");
      console.log(employee_result);
      console.log("------------------------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: employee_result})
      return (employee_result);
    })
    .catch((err) => {
      console.log("!!!!!!!!!!!!!!!!LoadEmployee!!!!!!!!err!!!!!!!!");
      console.log(err);
      console.log("------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: {status: "NOTLOGINED", employee: null}})
      return(null);
    });
  }

export const EmployeeLogoutAction = async (dispatch: any) => {
  console.log("!!!!!!!!!!!!!!!!EmployeeLoginAction!!!!!!!!!!!!!!!!");
  dispatch({type: ACTIONS.REST_EMPLOYEE, employee_result: {status: "LOGOUTED", employee: null}});
  }


export const EmployeeRegistAction = async (dispatch: any, data: any) => {
  console.log("!!!!!!!!!!!!!!!!EmployeeRegistAction!!!!!!!!!!!!!!");
  console.log(data);
  console.log("-------------------------------------------")
  // axiosでのAPIコール
  const url = EnvSettings.REACT_APP_MUSERVER + "employee";
  await axios
    .post(url, data)
    .then(res => res.data)
    .then(employee_result => {
      console.log("!!!!!!!!!!!!!!!!EmployeeRegistAction(EmployeeRegist)!!!!!!!!!!!!!!!!");
      console.log(employee_result);
      console.log("------------------------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: employee_result})
      return (employee_result);
    })
    .catch((err) => {
      console.log("!!!!!!!!!!!!!!!!EmployeeRegistAction!!!!!!!!err!!!!!!!!");
      console.log(err);
      console.log("------------------------");
      dispatch({type: ACTIONS.PASS_EMPLOYEE, employee_result: {status: "NOTLOGINED", employee: null}})
      return(null);
    });
  }

export const GetDeviceAction = async (dispatch: any) => {
  console.log("!!!!!!!!!!!!!!!!GetDeviceAction!!!!!!!!!!!!!!!!");
  await DeviceInfo.getUniqueId()
    .then(devId => {
      console.log("DeviceInfo.getUniqueId succeeded![" + devId + "]");
      dispatch({type: ACTIONS.PASS_DEVICE, device: devId})
      return (devId);
    })
    .catch(error => {
      console.log("DeviceInfo.getUniqueId failed! Refer to below for detail error!");
      console.log(error);
      console.log("--------------------------------------------");
      dispatch({type: ACTIONS.PASS_DEVICE, device: "empty"})
      return ("empty");
    }) 
}
  