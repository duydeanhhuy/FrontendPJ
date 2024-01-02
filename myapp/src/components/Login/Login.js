import './Login.scss'
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/authActions.js'
import { loginAxios } from '../../axios/fetchData'
import { React ,Component, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { withRouter } from '../../routes/withRouter.js';
import { userLoginStart } from '../../store/actions/authActions.js';
const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.login.currentUser)
  const handleClickContinue = (event) => {
    event.preventDefault()
    dispatch(userLoginStart(email,password))
  }
  useEffect(()=>{
    console.log(`check user:`,user)
    if(user && user.accessToken){
      navigate(`/`)
    }
  },[user])
  
    return (
    <>
    <section className='login-container'>
      <div className='login-title'>
        Log in
      </div>
      <form>
        <label>
          Email
        </label>
        <input type='text' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>
          PASSWORD
        </label>
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' onClick={(e)=>handleClickContinue(e)}>
          Continue
        </button>
      </form>
      <div className='login-register'>
        Don't have an account yet?
      </div>
      <Link className='login-register-link' to='/register'> Register one for free
      </Link>
    </section>
    </>
    )
}
export default Login
