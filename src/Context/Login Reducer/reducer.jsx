import { LOGIN, LOGOUT, REGISTER } from "./Actions"
const initialState = {
    isLoading: true,
    id: null,
    userToken: null,
}
const reducer = (state, action) =>{
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                id: action.id,
                userToken: action.token,
                isLoading: false,
            }
        case REGISTER:
            return{
                ...state,
                id: action.id,
                isLoading: false,
            }
        case LOGOUT:
            return{
                ...state,
                id: null,
                userToken: null,
                isLoading: false,
            }
    }
}

export {initialState}
export default reducer;