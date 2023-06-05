import { React } from 'react';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'

import NavbarOfficer from '../../component/NavbarOfficer.js'

import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const AddPolicy = () => {
  const { Token, loginStatus } = sessionStorage
  const [policyName, setPolicyName] = useState('')
  const [minSumAssured, setMinSumAssured] = useState('')
  const [maxSumAssured, setMaxSumAssured] = useState('')
  const [policyDescription, setpolicyDescription] = useState('')

  const percentage = 0

  const navigate = useNavigate()

  useEffect(() => {
    if (!loginStatus) {
      navigate('/officerLogin')
    }
  }, []);

  const addPolicy = () => {
    console.log(policyName);
    console.log(minSumAssured);
    console.log(maxSumAssured);
    console.log(policyDescription);
    console.log(policyName.length === 0);
    console.log(minSumAssured <= 0);
    console.log(parseInt(maxSumAssured) < parseInt(minSumAssured));
    console.log(policyDescription.length=== 0);

    function validateUsername(username) {
      const pattern = /^[a-zA-Z_]+$/;
      if( pattern.test(username)){
          return true;
      }
      else{
          return  false;
      }
    }

//policyName.length === 0
    if ((!validateUsername(policyName)) || minSumAssured <= 0 || parseInt(maxSumAssured) < parseInt(minSumAssured) || policyDescription.length=== 0) {
      toast.warning('please enter valid data')
    } else {
      const name = policyName
      const body = {
        name,
        minSumAssured,
        maxSumAssured,
        policyDescription
      }

      // url to make signin api call
      const url = `${URL}/admin/policy/addtypeofpolicy`

      // make api call using axios
      axios.post(url, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Authorization": 'Bearer' + Token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {

          toast.success('Policy Type Added Successfully')

          // get the data sent by server
          const { policyId, name } = result['data']

          // persist the logged in user's information for future use
          sessionStorage['policyId'] = policyId
          sessionStorage['policyName'] = name
          navigate('/AddPolicyTerms')
        } else {
          toast.error('Failed to add policy type')
        }
      })
    }
  }

  // const nextPage = () => {
  //   navigate('/AddPolicyTerms')
  // }




  return (
    <div>
      <NavbarOfficer />
      <br /><br />
      
      <div className="progressBar" style={{height:"50px"}}>
        <ProgressBar now={percentage} label={`${percentage}% completed`} />
      </div>
      <br /><br />
      <center>
        <h1>Add New Type of Policy</h1>
      </center>
      <br />
      <br />

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Policy Name
                        </label>
              <input
                onChange={(e) => {
                  setPolicyName(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Min. Sum Assured
                        </label>
              <input
                onChange={(e) => {
                  setMinSumAssured(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Max. Sum Assured
                        </label>
              <input
                onChange={(e) => {
                  setMaxSumAssured(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Policy Description
                        </label>
              <input
                onChange={(e) => {
                  setpolicyDescription(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <button onClick={addPolicy} className="btn btn-primary">Add Policy Type</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <button onClick={nextPage} className="btn btn-success">Add Policy Terms</button> */}
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>

  )
}

export default AddPolicy