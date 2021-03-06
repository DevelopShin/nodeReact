import axios from 'axios'
import { LOGIN_USER } from './types'
import {REGISTER_USER} from './types'

export function loginUser(dataTosubmit){

      const getSeverMsg = axios.post('/api/users/login', dataTosubmit).then(response=>response.data)

      return{
            type: LOGIN_USER,
            payload: getSeverMsg
      }
}

export function registerUser(dataTosubmit){

      const getSeverMsg = axios.post('/api/users/register', dataTosubmit).then(response=>response.data)

      return{
            type: REGISTER_USER,
            payload: getSeverMsg
      }
}