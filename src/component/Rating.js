import Navbar from "./Navbar"
import { useState, useEffect } from 'react';
import axios from 'axios'

const RatingReview=()=>{

    const [feedback,setfeedback]=useState([])

    const loadfeedback=()=>{

        const url=`http://localhost:5275/api/Users/GetFeedback`

        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            
            if(response.status===200){
                setfeedback(result)
            console.log("succes   feedback")
           

            } else {
                console.log("error feedback")
            }
        })
    }

    useEffect(()=>{
        loadfeedback()
        console.log("getting feedback")
    },[])

    return (
        <div><Navbar></Navbar>
           <h1>Reviews</h1>
      <ul>
        {feedback.map(item => (
          <li key={item.id}>{item.name}  ::  <br></br>
          {item.text_feed}</li>
        ))}
      </ul>
           
        </div>
    )
}
export  default RatingReview   