import React ,{useState}from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_action/user_action';


function RegisterPage(props) {

      const dispatch = useDispatch();

      const [info, setInfo] = useState({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
      })

      const {name, email, password,confirmPassword} = info


      const onChangeHandler = (e)=>{
            const {name, value} = e.target
            setInfo({
                  ...info,
                  [name]:value
            })}


      const onSubmitHandler = (e) =>{
            e.preventDefault()
            if(password != confirmPassword) {
                  alert("Passwords Don't Match");
            } else {

                  const infoBody = {
                        name:name,
                        email:email,
                        password:password}
            
            
                  dispatch(registerUser(infoBody))
                  .then(response => {
                        console.log("회원가입 ",response.payload.registerSuccess)
                        
                        if (response.payload.registerSuccess) {
                              props.history.push('/loginPage')
                        } else {
                              alert('Error에러˝')
                        }
                        })
            }
      }

      return (
            <div>
                  <div style = {{
                        display:'flex', justifyContent: 'center', alignItems:'center'
                        ,width:'100%', height:'100vh'
                  }}>
                        <form onSubmit={onSubmitHandler} style={{display: 'flex', flexDirection:'column'}}>
                              <label>Name</label>
                              <input type='string' name='name' value ={name} onChange={onChangeHandler} ></input>
                              <label>Email</label>
                              <input type='email' name="email" value ={email} onChange={onChangeHandler} ></input>
                              <label>Password</label>
                              <input type="password" name="password" value={password} onChange={onChangeHandler}></input>
                              <label>Confirm Password</label>
                              <input type="password" name="confirmPassword" id="confirm_password" value={confirmPassword} onChange={onChangeHandler}></input>
                              
                              <br />
                              <button type="submit">
                                    Join
                              </button>
                        </form>
                  </div>
            </div>
      )
}

export default withRouter(RegisterPage)
