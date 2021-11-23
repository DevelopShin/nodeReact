import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_action/user_action';
import { withRouter } from 'react-router-dom';


function LoginPage(props) {
      const dispatch = useDispatch();
      const [Email, setEmail] = useState("")
      const [Password, setPassword] = useState('')

      const EmailHandler = (e)=>{setEmail(e.target.value)}
      const PasswordHandler = (e) =>{setPassword(e.target.value)}
      

      const onSubmitHandler = (e) =>{
            e.preventDefault()
            let infoBody = {
                  email:Email,
                  password:Password
            }
            
            dispatch(loginUser(infoBody))
            .then(response => {
                  console.log(response.payload.loginSuccess)
                  if (response.payload.loginSuccess) {
                      props.history.push('/')
                  } else {
                      alert('Error˝')
                  }
              })
      }

      return (
            <div>
                  <div style = {{
                        display:'flex', justifyContent: 'center', alignItems:'center'
                        ,width:'100%', height:'100vh'
                  }}>
                        <form onSubmit={onSubmitHandler} style={{display: 'flex', flexDirection:'column'}}>
                              <label>Email</label>
                              <input type='email' value ={Email} onChange={EmailHandler} ></input>
                              <label>Password</label>
                              <input type="password" value={Password} onChange={PasswordHandler}></input>
                              <br />
                              <button type="submit">
                                    Login
                              </button>
                        </form>
                  </div>
            </div>
      )
}

export default withRouter(LoginPage)
