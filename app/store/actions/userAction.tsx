import axios from "axios"
import * as ACTIONS from '../types';
import * as EnvSettings from "../../config/Settings";

const initData = {
  user: null,
}

const dummyUser = {
  user: {
    "name": {
      "title": "DummyTitle",
      "first": "DummyFirst",
      "last": "DummyLast?"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/62.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
    }
  }
}

export const LoadUserAction = async (dispatch: any) => {
  console.log("!!!!!!!!!!!!!!!!LoadUserAction!!!!!!!!!!!!!!!!");
  // axiosでのAPIコール
  await axios
    .get(EnvSettings.RANDOM_USER_API)
    .then(res => res.data)
    .then(user => {
      console.log("!!!!!!!!!!!!!!!!userAction(LoadUser)!!!!!!!!!!!!!!!!");
      console.log(user.results);
      console.log("------------------------------------------");
      dispatch({type: ACTIONS.PASS_USER, user: user.results[0]})
      return user.results[0]
    })
    .catch((err) => {
      console.log("!!!!!!!!!!!!!!!!LoadUserAction!!!!!!!!err!!!!!!!!");
      console.log(err);
      console.log("------------------------");
      dispatch({type: ACTIONS.PASS_USER, user: dummyUser.user})
      return dummyUser.user
    });
  }

export function LoadUserActionOrig() {
  console.log("!!!!!!!!!!!!!!!!LoadUserAction!!!!!!!!!!!!!!!!");
  console.log("------userLogIn-------")
  //console.log(input)

  return (dispatch: any, getState: any) => {
    // axiosでのAPIコール
    return axios
      .get(EnvSettings.RANDOM_USER_API)
      .then(res => res.data)
      .then(user => {
        console.log("!!!!!!!!!!!!!!!!userAction(LoadUser)!!!!!!!!!!!!!!!!");
        console.log(user);
        console.log("------------------------------------------");
        dispatch({type: ACTIONS.PASS_USER, user: user.results[0]})
        return user
      })
  }
}
