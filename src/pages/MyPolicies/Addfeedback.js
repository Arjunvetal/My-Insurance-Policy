import axios from 'axios'
import Navbar from '../../component/Navbar.js'
import { useState } from 'react';
const Addfeedback=()=>{

    const[name,setname]=useState()
    const[comment,setcomment]=useState()   
    
    const addfeedback=()=>{
    const body={
        Name:name,
        text_feed:comment
    }

    const url=`http://localhost:5275/api/Users/AddFeedback`

    axios.post(url, body).then((response) =>{
        const result = response.data
            console.log(result)
            if(response.status===200){
               // setfeedback(result)
            console.log("succesfully add feedback")
            } else {
                console.log("error feedback")
            }

    })
}

    return (
        <div>
            <Navbar/>
        <h2>You Can Share Your Experience</h2>

      <form class="form-inline" action="/action_page.php">
            <div class="form-group">
                <label class="sr-only" >Name:</label>
                <input
                onChange={(e) => {
                  setname(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div class="form-group">
                <label class="sr-only" for="pwd">Comments:</label>
                <input
                onChange={(e) => {
                  setcomment(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>
           
            <button type="button" onClick={addfeedback} class="btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}

export default Addfeedback