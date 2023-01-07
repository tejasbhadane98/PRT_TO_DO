import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../SignUp/signup.css"


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const SignUpHandler =(e)=>{
        e.preventDefault();
        fetch("/signUp", {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                confirmpassword
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                alert(data.message)
                navigate("/")
            }
        })
    }
    return (
        <>
            <div className="container">
                <div className="main">
                    <section className="register">
                        <h1>Register</h1>
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
                        <input type="password" value={confirmpassword} id="confirmpassword" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}>

                        </input>
                    </section>
                    <section>
                        <button className="button" id="btn" onClick={(e)=>SignUpHandler(e)}>
                            Register

                        </button>
                        
                    </section>

                    <h3 className="mem-login"> 
                    <Link to="/"> Member Login </Link></h3>


                </div>

            </div>
        </>
    )
}


