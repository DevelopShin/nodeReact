import { LOGIN_USER } from "../_action/types";
import { REGISTER_USER } from "../_action/types";


export default function user(state={}, action) {
      switch (action.type) {
            case LOGIN_USER:
                  return {...state, loginSuccess: action.payload}
            case REGISTER_USER:
                  return {...state, registerSuccess:action.payload}
      
            default:
                  return state;
      }
};
