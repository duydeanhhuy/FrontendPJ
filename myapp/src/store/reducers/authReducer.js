import { useNavigate } from "react-router-dom"
import actionTypes from "../actions/actionTypes"

const initialState = {
    login: {
        currentUser:null,
        isFetchingLogin: false,
        isError: false
    },
    register: {
        isFetching: false,
        isError: false,
        success: false
    },
    logout: {
        isFetching: false,
        isError: false
    }

}
const authReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.USER_LOGIN:
            state.login.isFetchingLogin = true
            state.login.currentUser = null
            return {
                ...state,

            }
        case actionTypes.LOGIN_SUCCESS:
            state.login.isFetchingLogin = false
            state.login.currentUser = action.data
            state.login.isError = false
            return {
                ...state,
            }
        case actionTypes.LOGIN_FAILED:
            state.login.currentUser = null
            state.login.isFetchingLogin = false
            state.login.isError = true
            return {
                ...state
            }
        case actionTypes.USER_REGISTER_START:
            state.register.isFetching = true
            state.register.isError = false
            return{
                ...state
            }
        case actionTypes.REGISTER_SUCCESS:
            state.register.isFetching = false
            state.register.isError = false
            state.register.success = true
            
            return{
                ...state
            }
        case actionTypes.REGISTER_FAILED:
            
            state.register.isFetching = false
            state.register.isError = false
            state.register.success = false
            return{
                ...state
            }
        case actionTypes.LOG_OUT_START:
            state.logout.isFetching = true
            return{
                ...state,
            }
        case actionTypes.LOG_OUT_SUCCESS:
            state.login.currentUser = null
            state.logout.isError = false
            state.logout.isFetching= false
            return{
                ...state,
            }
        case actionTypes.LOG_OUT_FAILED:
            state.login.currentUser = null
            state.logout.isError = true
            state.logout.isFetching= false
            return{
                ...state,
            }
        default:
            return state;
    }

}
export default authReducer