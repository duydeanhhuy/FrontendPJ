import axios from 'axios'
import { deleteUser, fetchAllUser } from '../../axios/fetchData'
import actionTypes from './actionTypes'
import { ToastContainer, toast } from 'react-toastify'
export const getAllUserStart = (accessToken,axiosJWT) => {
  return async (dispatch, getState) => {
    dispatch({
        type: actionTypes.GET_ALL_USERS_START
    })
    try {
        let res = await axiosJWT.get(`/get-user`,
            {headers: {token: `Bearer ${accessToken}`}}
        )
         console.log(`check res getalluser: `,res)
        if (res && res.data.errCode === 0){
            dispatch(getAllUserSuccess(res.data.listUser))
        }else{
            dispatch(getAllUserFailed(res.data))
        }
    }catch(e){
        dispatch(getAllUserFailed(e))
    }
  }
}

export const getAllUserSuccess = (data) => ({
  type: actionTypes.GET_ALL_USER_SUCCESS,
  data: data
})
export const getAllUserFailed = (data) => ({
  type: actionTypes.GET_ALL_USER_FAILED,
  data: data
})

export const deleteUserStart = (id,accessToken,axiosJWT) =>{
  return async(dispatch,getState)=>{
    dispatch({type:actionTypes.DELETE_USER_START})
    try{
        let res = await axiosJWT.delete(`/delete-user/${id}`,{
          headers: {token: `Bearer ${accessToken}`}
        })
        console.log(`check res delete: `,res)
        if(res && res.data.errCode === 0){
          dispatch(deleteUserSuccess(res.data))
          toast.success(res.data.errMessage)
        }else{
          dispatch(deleteUserFailed(res.data))
          toast.error(res.data.errMessage)
        }
    }catch(e){
      dispatch(deleteUserFailed(e))
      
    }
  }
}
export const deleteUserSuccess = (mes) =>({
  type:actionTypes.DELETE_USER_SUCCESS,
  message: mes
})
export const deleteUserFailed = (mes) =>(
  {
    type:actionTypes.DELETE_USER_FAILED,
    message:mes
  }
)