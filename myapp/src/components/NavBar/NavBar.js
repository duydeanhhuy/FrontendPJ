import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOutStart, logOutSuccess,userLoginSuccess } from "../../store/actions/authActions";
import { createAxios } from "../../createInstance";
const NavBar = () => {
  const userLogin = useSelector(state => state.auth.login.currentUser)
  const accessToken = useSelector(state => state.auth.login.currentUser?.accessToken)
  const navigate = useNavigate()
  const [user,setUSer] = useState(null);
  const dispatch = useDispatch()
  let axiosJWT = createAxios(userLogin,dispatch,userLoginSuccess)
  const handleClickLogOut =() =>{
    dispatch(logOutStart(accessToken,axiosJWT,navigate))
  }
  useEffect(()=>{
    console.log(`check userLogin: `,userLogin)
    if(userLogin === null && !accessToken){
      navigate(`/login`)
    }
  },[userLogin])
  return (
    
    <nav className="navbar-container">
    
      
      {userLogin && userLogin.userInfo? (
        <>
        <Link to="/" className={"navbar-home"}> Home </Link>
        <p className="navbar-user">Hi, <span> {userLogin.userInfo.username}  </span> </p>
        <Link className="navbar-logout" onClick={handleClickLogOut}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className={window.location.pathname === "/login" ? "active-login" : "navbar-login"}> Login </Link>
      <Link to="/register" className={window.location.pathname === "/register" ? "active-register" : "navbar-register"}> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;