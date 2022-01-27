import React, { useReducer } from "react";
import { UserContext } from "../userContext";
import { UserReducer } from "../reducer/UserReducer";

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, 0);
    return(
        <UserContext.Provider value={{state, dispatch}}>
            {props.childern}
        </UserContext.Provider>
    )
}