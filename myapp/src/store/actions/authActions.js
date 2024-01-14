import actionTypes from './actionTypes'
import { logOut, loginAxios, registerUser } from '../../axios/fetchData'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const userLoginStart = (email, password) => 
   async (dispatch, getState) => {
    dispatch({
      type: actionTypes.USER_LOGIN
    })
    try {
      let res = await loginAxios(email,password)
      console.log(`check res login:`,res)
      if(res && res.errCode === 0 ){
        
        dispatch(userLoginSuccess(res.user))
        toast.success(`Login successfully !!!`)
      }else{
        toast.error(res.errMessage)
        dispatch(userLoginFailed())
      }
    } catch(e) {
      dispatch(userLoginFailed())
    }
  }


export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.LOGIN_SUCCESS,
  data: userInfo
})

export const userLoginFailed = () => ({
  type: actionTypes.LOGIN_FAILED
})

export const userRegisterStart = (email,username,password) => {
  return async (dispatch,getState)=>{
    dispatch({type:actionTypes.USER_REGISTER_START})
    try{
      
      let res = await registerUser(email,username,password)
      console.log(`res userREgister:`,res);
      if(res && res.errCode === 0){
        // const navigate = useNavigate()
        dispatch(userRegisterSuccess(res))
        toast.success(res.errMessage,` Click Login !!!`)
        // navigate(`/login`)
      }else{
        dispatch(userRegisterFailed(res))
        toast.error(res.errMessage)
      }
    }catch(e){
      dispatch(userRegisterFailed(e))
    }
  }
}
export const userRegisterSuccess = (data) => ({
  type: actionTypes.REGISTER_SUCCESS,
  data: data
})
export const userRegisterFailed = (data) => ({
  type: actionTypes.REGISTER_FAILED,
  data: data
})

export const logOutStart = (accessToken,axiosJWT,navigate)=>{
    return async (dispatch,getState) => {
      dispatch({type:actionTypes.LOG_OUT_START})
      try{
        let res = await logOut(accessToken)
        console.log(`check res logout start: `,res)
        if(res){
            dispatch(logOutSuccess())
            navigate(`/login`)
        }       
      }catch(e){
        console.log(`catch(e)`)
        dispatch(logOutFailed())
      }
    }
}
export const logOutSuccess = (data) => ({
  type: actionTypes.LOG_OUT_SUCCESS,
  data: data
})
export const logOutFailed = (data) => ({
  type: actionTypes.LOG_OUT_FAILED,
  data: data
})