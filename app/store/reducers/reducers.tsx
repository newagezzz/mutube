import { combineReducers } from 'redux'
import userReducer from './userReducer'
import employeeReducer from './employeeReducer'

export default combineReducers({
    userReducer,
    employeeReducer
})


