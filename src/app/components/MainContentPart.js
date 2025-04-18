"use client"
import React from "react";
import * as Components from './components';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useState  } from "react";
import axios from 'axios'
function App() {
    const [signIn, toggle] = React.useState(true);
    const router = useRouter();
        const [password, setPassword] = useState('');
        const [fullname , setName] = useState('');
         const [email , setEmail] = useState('');
        const handleSubmit = async (e) => {
            e.preventDefault();
           await axios.post('http://localhost:4000/login', {password,email})
           .then((response) => {
            if(response.status == 200){
              const data = response.data;
                router.push('/');
                console.log(data)
                localStorage.setItem("token", data.accessToken)
                localStorage.setItem("user" , data._id)
            }
           })
        }
        const handleSignUP = async (e) => {
            e.preventDefault();
           await axios.post('http://localhost:4000/register', {fullname ,password,email})
           .then((response) => {
            if(response.status == 200){
              const data = response.data;
                router.push('/');
                console.log(data)
                localStorage.setItem("token", data.accessToken)
                localStorage.setItem("user" , data._id)
            }
           })
        }
     return(
      <div className="h-screen w-screen flex justify-center items-center">
         <Components.Container>
             <Components.SignUpContainer >
                 <Components.Form onSubmit={handleSignUP}>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                     <Components.Input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                     <Components.Input type='password' placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} />
                     <span className="rounded-md h-10 w-10 bg-slate-300 flex justify-center items-center mb-2">
                        
                       <FaGoogle
                        style={{ color: '#DB4437', cursor: 'pointer' }} // Add cursor: pointer for better U
                        />
                     </span>
                     <Components.Button>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer >
                  <Components.Form onSubmit={handleSubmit}>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email'   onChange={(e)=>setEmail(e.target.value)} />
                      <Components.Input type='password' placeholder='Password'   onChange={(e)=>setPassword(e.target.value)} />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer>
                 <Components.Overlay>

                 <Components.LeftOverlayPanel >
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
         </div>
     )
}

export default App;