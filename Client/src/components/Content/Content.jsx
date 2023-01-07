import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../Content/Content.css"


export default function Content(){
    const navigate = useNavigate();
    const[properties, setProperties] =useState([]);
    useEffect(()=>{
        fetch("/getlist",{
            method:"GET",
            headers:{"Authorization":"Bearer "+ localStorage.getItem("jwt")}
        })
        .then(res=>res.json())
        .then(data=>{
            setProperties(data)
        })
    },[properties]);
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.email.split("@")[0];
    const Logout =(e)=>{
        console.log("Logout")
        localStorage.clear();
        navigate("/")
    }
    return(
        <>
        <div className="All-content">
            <div className="content-2">
                <div className="box-11">
                    <h2>{username}</h2>
                </div>

                <div className="box-22">
                    <section className="sidebar">
                        <h1>To Do List</h1>
                        <p>History</p>
                        <button id="btn" onClick={(e)=>Logout(e)} >
                    Logout
                </button>



                    </section>
                    <section className="middle">
                        <button className="btn-2" onClick={()=>navigate("/details")}>
                            Add New Activity
                        </button>
                        <div className="table">
                            <table>
                                <tr>
                                    <th>
                                        Activity
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Timetaken
                                        <h4>(Hrs:Min:Sec)</h4>
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </table>

                        </div>

                    </section>

                </div>
                </div>
           

                  

        </div>
        </>
    )
}