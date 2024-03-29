const actionTypes = Object.freeze({
  USER_LOGIN: 'USER_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',

  USER_REGISTER_START: 'USER_REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILED: 'REGISTER_FAILED',

  // user
  GET_ALL_USERS_START: 'GET_ALL_USER_START',
  GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
  GET_ALL_USER_FAILED: 'GET_ALL_USER_FAILED',

  DELETE_USER_START: 'DELETE_USER_START',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED : 'DELETE_USER_FAILED',

  LOG_OUT_START: 'LOG_OUT_START',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILED: 'LOG_OUT_FAILED'
})

export default actionTypes
