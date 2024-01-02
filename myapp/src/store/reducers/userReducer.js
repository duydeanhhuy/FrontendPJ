import actionTypes from "../actions/actionTypes"

const initialState = {
    users: {
        allUsers : [],
        isFetching: false,
        isError: false,
    }
}
const userReducer = (state = initialState,action) =>{
    switch (action.type){
        case actionTypes.GET_ALL_USERS_START:
            state.users.isFetching = true
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users.allUsers = action.data
            state.users.isFetching = false
            state.users.isError = false
            return{
                ...state,
            }
        case actionTypes.GET_ALL_USER_FAILED:
            console.log(`get user failed: `,action.data)
            state.users.isFetching = false
            state.users.isError = true
            state.users.allUsers= []
            return{
                ...state
            }
        case actionTypes.DELETE_USER_START:
            state.users.isFetching = true
            
            return{
                ...state,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            console.log(`delete success: `,action.message)
            state.users.isFetching = false
            state.users.isError = false
            return{
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            console.log(`delete failed: `,action.message)
            state.users.isFetching = false
            state.users.isError = true
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default userReducer;