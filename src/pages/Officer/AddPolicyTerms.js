import { React, useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import NavbarOfficer from '../../component/NavbarOfficer.js'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const AddPolicyTerms = () => {
  const { policyName, policyId, Token, loginStatus } = sessionStorage
  const [policyTerm, setPolicyTerm] = useState('')
  const [payableTerm, setPayableTerm] = useState('')
  const [ageIn, setAgeIn] = useState('')
  const [ageMax, setAgeMax] = useState('')

  const percentage = 25

  const [policyTerms, setPolicyTerms] = useState([])

  useEffect(() => {
    if (!loginStatus) {
      navigate('/officerLogin')
    }
  }, []);

  const navigate = useNavigate()

  const addTerm = async () => {
    if (policyTerm <= 0 || payableTerm <= 0 || ageMax <= ageIn || ageIn <= 0) {
      toast.warning('please enter valid data')
    } else {
      const body = {
        policyTerm,
        payableTerm,
        ageIn,
        ageMax
      }

      // url to make signin api call
      const url = `${URL}/admin/policy/addpolicyterm/${policyId}`

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
          setPayableTerm('')
          setPolicyTerm('')
          setAgeIn('')
          setAgeMax('')

          toast.success('Policy Term Added Successfully')

          // get the data sent by server
          setPolicyTerms(result['data'])

          //console.log(termId+"  "+policyTerm)
          console.log(policyTerms)
          console.log(result['data'])
          sessionStorage['policyTerms'] = result['data']

        } else {
          toast.error('Failed To Insert Data')
        }
      })
    }
  }

  const nextPage = () => {
    navigate('/AddAgePremium')
  }



  return (
    <div>
      <NavbarOfficer />
      <br /><br />
      <div className="progressBar" style={{height:"50px"}}>
        <ProgressBar now={percentage} label={`${percentage}% completed`} />
      </div>
      <br /><br />
      <center>
        <h1>Add New Policy Term</h1>
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
              <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={policyName} />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Policy Term (years)
                        </label>
              <input
                onChange={(e) => {
                  setPolicyTerm(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Payable Term (years)
                        </label>
              <input
                onChange={(e) => {
                  setPayableTerm(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Min. Age (years)
                        </label>
              <input
                onChange={(e) => {
                  setAgeIn(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Max. Age (years)
                        </label>
              <input
                onChange={(e) => {
                  setAgeMax(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <button onClick={addTerm} className="btn btn-primary">Add Policy Term</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={nextPage} className="btn btn-success">Next Page</button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>

  )
}

export default AddPolicyTerms