import { LOGIN_USER } from "../_action/types";

export default function user(state={}, action) {
      switch (action.type) {
            case LOGIN_USER:
                  return {...state, loginSuccess: action.payload}
      
            default:
                  return state;
      }
};