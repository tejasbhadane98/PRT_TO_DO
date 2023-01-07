import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Content/Details.css"



export default function Details({data, setData}){
    const navigate = useNavigate();
    const[activity, setActivity] =useState();
    const[status, setSatus] =useState();
    useEffect(()=>{
        if(!data.email){
            return  fetch("/list",{
                method:"POST",
                headers:{"Authorization":"Bearer "+ localStorage.getItem("jwt")},body:JSON.stringify({
                    data
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.e)
                {
                    alert(data.e)
                }
                else{
                    alert(data.message)
                    navigate("/Content") 
                    setData({})
                }
            })
        
        }
    },[data]);
    
    const SetDetails =(e)=>{
        e.preventDefault();
        // console.log(setDetails)
        setData({
            ...data,
            activity,
            status
        })
        navigate("/Content") 
    }
    return(
        <>
        <div className="dt-1">
            <h3>Activity</h3>
            <input type="text" name="activity" value={activity} onChange={(e)=>setActivity(e.target.value)}/>


            <h3>Status</h3>
            <input type="text" name="status" value={status} onChange={(e)=>setSatus(e.target.value)}/>

            <div>
                <button id="b" onClick={(e)=>setDetails(e)}>ADD</button>
                
            </div>
            

        </div>
        </>
    )
}