import './HomePage.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/userActions'
import * as action from '../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import axiosJ from '../../axios/customize'
import { deleteUserStart } from '../../store/actions/userActions'
import { userLoginSuccess } from '../../store/actions/authActions'
import { createAxios } from '../../createInstance'
import { toast } from 'react-toastify'
const HomePage = () => {
  // DUMMY DATA
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const AllUsers = useSelector(state => state.user.users.allUsers)
  const userLogin = useSelector(state => state.auth.login.currentUser);
  const [isMessage, setIsMessage] = useState(false);
   const axiosJWT = axios.create({
     baseURL: 'http://localhost:8080',

   })
  //const axiosJWT = createAxios(userLogin, dispatch, userLoginSuccess)
  const handleDelete = (id) => {
    console.log(`id:`, id)
    dispatch(deleteUserStart(id, userLogin.accessToken, axiosJWT))
    setTimeout(()=>{
      dispatch(actions.getAllUserStart(userLogin.accessToken,axiosJWT))
    },300)
  }
  const refreshToken = async () =>{
      const res = await axiosJ.post(`/refreshToken`, {
        withCredentials: true
      })
      console.log(`check res refresh: `,res)
      return res?.accessToken
  }
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date()
      let decodedToken = jwtDecode(userLogin.accessToken)
      if(decodedToken.exp < (date.getTime()/1000)){
          let data = await refreshToken()
          console.log(`check data: `,data)
          let RefreshUser = {
              ...userLogin,
              accessToken: data
          }
          console.log(`check refresh-user: `,RefreshUser)
          dispatch(userLoginSuccess(RefreshUser))
          config.headers["token"] = "Bearer "+ data.accessToken
      }
      return config
    },(err)=>{
       return new Promise.reject(err)
    }
  )
useEffect(() => {
    if (!userLogin) {
      navigate(`/login`)
    }
    if (userLogin && userLogin?.accessToken) {
      dispatch(actions.getAllUserStart(userLogin.accessToken,axiosJWT))
    }
  }, [userLogin])
  return (
    
    <main className='home-container'>
    {console.log(`check allUsers :`,AllUsers)}
    {console.log(`check userLogin: `,userLogin)}
      <div className='home-role'>
        <span >Your role: </span> &nbsp;
        {userLogin && userLogin.userInfo.admin === false ? `User` : `Admin`}
      </div>
      <div className='home-title'>
        User List
      </div>
      <div className='home-userlist'>
        {AllUsers && AllUsers.length > 0 && 
          AllUsers.map((user) => {
             return (
               <div className='user-container' key={user.id}>
                 <div className='home-user'>
                   {user.username}
                 </div>
                 <div className='delete-user' onClick={()=>handleDelete(user.id)}>
                   Delete
                  </div>
               </div>
             )
           })}
      </div>
      {}
      <div className='delete-mes'>
          
      </div>
    </main>
  )
}

export default HomePage
