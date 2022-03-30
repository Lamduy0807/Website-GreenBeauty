import React,{useReducer} from "react";
import { LOGIN, LOGOUT } from "../Login Reducer/Actions";
import reducer, { initialState } from "../Login Reducer/reducer";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({children}) => {

const [loginState, dispatch] = useReducer(reducer,initialState);

const authContext = React.useMemo(
    ()=>({
    signIn: async (token, id) =>{
        try{
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
        } catch (e) {
            console.log(`Error is ${e}`);
        }
        dispatch({type: LOGIN, id : id, userToken : token})
    },
    logOut: async () =>{
        try{
            localStorage.removeItem('token')
            localStorage.removeItem('id')
        } catch (e) {
            console.log(`Error is ${e}`);
        }
        dispatch({type: LOGOUT})
    }
}),[]);

  return <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
