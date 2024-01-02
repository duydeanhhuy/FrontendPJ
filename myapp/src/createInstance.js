import axios from "axios"
import { jwtDecode } from "jwt-decode"
import axiosJ from './axios/customize'

export const createAxios = (user,dispatch,stateSuccess) =>{
    
    const newInstance = axios.create({
        baseURL: 'http://localhost:8080'
    })
    const refreshToken = async () =>{
      const res = await axiosJ.post(`/refreshToken`, {
        withCredentials: true
      })
      console.log(`check res refresh: `,res)
      return res?.accessToken
    }
    newInstance.interceptors.request.use(
        async (config) => {
        let date = new Date()
        let decodedToken = jwtDecode(user.accessToken)
        if(decodedToken.exp < (date.getTime()/1000)){
            let data = await refreshToken()
            console.log(`check data: `,data)
            let RefreshUser = {
                ...user,
                accessToken: data
            }
            console.log(`check refresh-user: `,RefreshUser)
            dispatch(stateSuccess(RefreshUser))
            config.headers["token"] = "Bearer "+ data.accessToken
        }
        return config;
        },
            (err)=>{
                return new Promise.reject(err)
            }
    )
}