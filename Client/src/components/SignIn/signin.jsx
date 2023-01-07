import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "../SignIn/Signin.css"
import { useNavigate } from "react-router-dom";


export default function Signin()
{
  const navigate =useNavigate()
  const [email,setEmail] = useState("")
  const [password,SetPassword] = useState("")
  const SignInHandler = (e) => {
    e.preventDefault()
    // console.log(email, password)
    fetch("/signIn", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                alert(data.message)
                navigate("/todoPage")
            }
        })
}

    return (
        <>
        <div className="container">
            <div className="main">
            <section className="register">
                        <h1>Member Login</h1>
                    </section>
                    <section>
                        <input type="email" value={email} id="email" placeholder="Username" onChange={(e)=>setEmail(e.target.value)}>

                        </input>
                    </section>

                    <section>
                        <input type="password" value={password} id="password" placeholder="Password" onChange={(e)=>SetPassword(e.target.value)}>

                        </input>
                    </section>
                    <section>
                        <button className="button" id="btn" onClick={(e)=>SignInHandler(e)}>
                            Login

                        </button>
                        
                    </section>
                    <h3 className="mem-login"> 
                    <Link to="/signUp"> Forgot Password </Link></h3>

            </div>

        </div>
         
        </>
    )
}