import { Component } from 'react'
import './Register.scss'
import {connect} from 'react-redux'
import { userLoginStart } from '../../store/actions/authActions';
import * as actions from '../../store/actions/authActions.js'
class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password: ''
    }
  }
  handleTypeData = (event,id) => {
    let copyState = {...this.state}
    copyState[id] = event.target.value
    this.setState({
      ...copyState
    })
  }
  handleClickCreate = async (event)=>{
    event.preventDefault()
    let res = await this.props.handleRegister(this.state.email,this.state.username,this.state.password)
    console.log(`res register:`,res);
  }
  render(){
  return (
    <section className='register-container'>
      <div className='register-title'>
        Sign up
      </div>
      <form>
        <label>
          EMAIL
        </label>
        <input type='text' placeholder='Enter your email' value={this.state.email} onChange={(e)=>this.handleTypeData(e,"email")}/>
        <label>
          USERNAME
        </label>
        <input type='text' placeholder='Enter your username' value={this.state.username} onChange={(e)=>this.handleTypeData(e,"username")}/>
        <label>
          PASSWORD
        </label>
        <input type='password' placeholder='Enter your password' value={this.state.password} onChange={(e)=>this.handleTypeData(e,"password")}/>
        <button type='submit' disabled={!this.state.email || !this.state.username || !this.state.password} onClick={(e)=>this.handleClickCreate(e)}>
          Create account
        </button>
      </form>
    </section>

  )
}
}
const mapStateToProps = state =>{
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleRegister: (email,username,password)=>dispatch(actions.userRegisterStart(email,username,password))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)
