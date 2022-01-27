import { USER_LOGIN } from "../type/userType";

export const UserReducer = (state={}, action) => {
    if(action.type === USER_LOGIN){
        return {
            ...state,
            user : action.payload
        }
    }else{
        return state
    }
}