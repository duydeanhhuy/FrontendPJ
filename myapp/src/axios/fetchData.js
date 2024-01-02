import axios from './customize'

const loginAxios = (userEmail, userPassword) => {
  return axios.post(`/api/login`, {email: userEmail,password: userPassword})
}
const registerUser = (email, username, password) => {
  return axios.post(`/api/register`, {email: email,username: username,password: password})
}
const fetchAllUser = (accessToken) => {
  return axios.get(`/get-user`, {headers: {token: `Bearer ${accessToken}`}})
}
// const deleteUser = (id, accessToken,axiosJWT) => {
//   return axios.delete(`/delete-user/${id}`, {headers: {token: `Bearer ${accessToken}`}})
// }
const logOut = (accessToken) => {
  console.log(`check access logout: `, accessToken)
  let mutute = `Bearer ` + accessToken
  return axios.post(`/api/logout`, {
    headers: {
      token: `Bearer ` + accessToken
    }
  })
}
export { loginAxios, registerUser, fetchAllUser, logOut }
