
import { LOGIN, PRIVATEROUTE, REMOVELOCALSTORAGE } from "../ActionType/ActionType";

const currentstate = {
    logindatavalue: "",
    privateroute: false,


}
export const Reducerfunction = (state = currentstate, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, logindatavalue: action.payload }

        case PRIVATEROUTE:
            return { ...state, privateroute: action.payload }
        case REMOVELOCALSTORAGE:
            return {
                ...state, logindatavalue: "",
                privateroute: false,
            }
        default:
            return state
    }

}
