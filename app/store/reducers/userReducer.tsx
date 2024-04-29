import axios from "axios"
import * as ACTIONS from '../types';
import * as EnvSettings from "../../config/Settings";

const initData = {
  user: null,
}

const LoadUser = async () => {
  // axiosでのAPIコール
  return await axios.get(EnvSettings.RANDOM_USER_API)
      .then(res => res.data)
      .then(user => {
        console.log("!!!!!!!!!!!!!!!!userAction(LoadUser)!!!!!!!!!!!!!!!!");
        console.log(user);
        console.log("------------------------------------------");
        return user
      })
}

export default function reducer(state = initData, action: any = {}) {
  switch (action.type) {
    case ACTIONS.LOAD_USER:
      console.log("!!!!!!!!!!!!!!!!userReducer(LOAD_USER)!!!!!!!!!!!!!!!!");
      const user = LoadUser();
      console.log(user);
      console.log("------------------------------------------");
      return {
        ...state,
        user: user
      }
    case ACTIONS.PASS_USER:
      console.log("!!!!!!!!!!!!!!!!userReducer(PASS_USER)!!!!!!!!!!!!!!!!");
      console.log(action.user);
      console.log("------------------------------------------");
      return {
        ...state,
        user: action.user,
      }
    case ACTIONS.REST_USER:
      console.log("!!!!!!!!!!!!!!!!userReducer(REST_USER)!!!!!!!!!!!!!!!!");
      console.log(action.user);
      console.log("------------------------------------------");
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

/*
export default function reducer(state={
  user: {},
  fetching: false,
  fetched: false,
  certificated: false,
  userList: [],
  error: null,
}, action) {
  console.log("!!!!!!!!!!!!!!!!userReducer!!!!!!!!!!!!!!!!");
  console.log(state);
  console.log(action);
  console.log("-------------------------");
  switch (action.type) {
    case "FETCH_USER": {
      return {...state, fetching: true};
    }
    case "USER_LOGIN": {
      return {...state, fetching: true};
    }
    case "FETCH_USER_REJECTED": {
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload,
        userList:[]
      };
    }
    case "SET_USER_NAME": {
      return {
        ...state,
        user: {...state.user, name: action.payload}
      };
    }
    case "SET_USER_AGE": {
      return {
        ...state,
        user: {...state.user, age: action.payload}
      };
    }
    case "USER_LOGIN_SUCCEEDED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        certificated: true,
        user: action.payload,
        userList:[]
      };
    }
    case "USER_LOGIN_FAILED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        certificated: false,
        user: action.payload,
        userList:[]
      };
    }
    case "USER_SEARCH_SUCCEEDED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        certificated: true,
        userList: action.payload
      };
    }
    case "USER_SEARCH_FAILED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        certificated: false,
        userList: []
      };
    }      
    case "USER_LOGOUT_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        certificated: false,
        user: action.payload,
        userList: []
      };
    }    
  }

  return state;
}
*/