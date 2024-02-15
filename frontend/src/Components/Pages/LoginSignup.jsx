import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import toast, { Toaster } from 'react-hot-toast';
function LoginSignup() {
  const [state,setState]=useState("Login");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData,setformData]=useState({
    username:"",
    password:"",
    email:""
    
  });
  const changeHandler = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
}

  const login = async ()=>{
    try {
      let responseData;
      console.log('login Function Executed', formData);
      const response = await fetch(`${apiUrl }/login`, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
      
      responseData = await response.json();
      
      if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace('/');
      } else {
          toast.error(responseData.error); // Display error message using toast
      }
  } catch (error) {
      console.error('Error during signup:', error);
  }
}

  const signup = async () => {
      try {
          let responseData;
          console.log('signup Function Executed', formData);
          const response = await fetch(`${apiUrl }/signup`, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
          
          responseData = await response.json();
          
          if (responseData.success) {
              localStorage.setItem('auth-token', responseData.token);
              window.location.replace('/');
          } else {
              toast.error(responseData.error); // Display error message using toast
          }
      } catch (error) {
          console.error('Error during signup:', error);
      }
  };
  
  return (
    <>
    <Toaster />
    <div className='LoginSignup'>
        <div className='loginSignup-container'>
          <h1>{state}</h1>
          <div className="login-signup-fields">
            {state==='Sign Up'?<input type='text'name='username' defaultValue={formData.username} placeholder='Your Name' onChange={changeHandler}/>:<></>}
            <input type='email' name='email' placeholder='Your Email' defaultValue={formData.email}  onChange={changeHandler}/>
            <input type='password' name='password' placeholder='Your password' defaultValue={formData.password}  onChange={changeHandler}/>
          </div>
          <button onClick ={()=>{state==='Login'?login():signup()}}className='loginsignup-btn'>continue</button>
          {
            state === 'Sign Up' ?
            <p className="loginsignup-login">Already have account? <span onClick={()=>{setState("Login")}}>login here</span></p>
            :
            <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>

          }
          <div className="loginsignup-agree">
            <input type='checkbox' name='' id=''/>
            <p className='m-0 '>by continue,I agree to term of use and privcy policy.</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default LoginSignup
