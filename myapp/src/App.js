import './App.scss'
import HomePage from './components/Home/HomePage'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register'
import NavBar from './components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App () {
  return (
    <>
    <Router>
      <NavBar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
  </>
  )
}

export default App
