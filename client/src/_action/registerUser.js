import axios from 'axios'
import { REGISTER_USER } from './types'

export function registerUser(dataTosubmit){

      const getSeverMsg = axios.post('/api/users/register', dataTosubmit).then(response=>response.data)

      return{
            type: REGISTER_USER,
            payload: getSeverMsg
      }
}