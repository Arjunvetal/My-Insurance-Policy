import * as React from 'react';
import { useNavigate } from 'react-router'
import NavbarOfficer from '../../component/NavbarOfficer.js'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { URL } from '../../config'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const AddAgePremium = () => {
  const { policyId, Token, loginStatus } = sessionStorage

  const [policyTerms, setPolicyTerms] = useState([])
  const [termId, setTermId] = React.useState(0);
  const [age, setAge] = useState('')
  const [yearlyPremium, setYearlyPremium] = useState('')

  const percentage = 50

  const navigate = useNavigate()

  useEffect(() => {
    if (!loginStatus) {
      navigate('/officerLogin')
    }
    searchPolicyTerms()
  }, []);

  const searchPolicyTerms = async () => {
    const url = `${URL}/policy/displaypolicytermbyid/${policyId}`
    await axios.get(url).then((response) => {
      const result = response.data
      console.log(result)
      if (result['status'] === 'success') {
        setPolicyTerms(result.data)
      } else {
        toast.error(result['error'])
      }
    })
  }

  const addAgePremium = () => {
    if (age <= 0 || yearlyPremium <= 0 || termId === 0) {
      toast.warning('please enter valid data')
    } else {
      const body = {
        age,
        yearlyPremium,
        termId
      }

      // url to make signin api call
      const url = `${URL}/admin/policy/addagepremium/${termId}`

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

          toast.success('Age-Premium Added Successfully')

          // get the data sent by server
          console.log(result['data'])
        } else {
          toast.error('Failed To Insert Data')
        }
      })
    }
  }

  const nextPage = () => {
    navigate('/AddPolicyPayment')
  }

  const handleChange = (event) => {
    setTermId(event.target.value);
  };



  return (


    <div>
      <NavbarOfficer />
      <br /><br />
      <div className="progressBar" style={{height:"50px"}}>
        <ProgressBar now={percentage} label={`${percentage}% completed`} />

      </div>
      <br /><br />
      <center>
        <h1>Add Age-Premium</h1>
      </center>

      <br />
      <br />

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Policy Term</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={termId}
              label="Policy Term"
              onChange={handleChange}
            >
              {
                policyTerms && policyTerms.map((policyTerm) => (
                  <MenuItem value={policyTerm.termId}>{policyTerm.policyTerm}</MenuItem>
                )
                )}
            </Select>
            <FormHelperText>Select Policy Term to add Age and Premium</FormHelperText>
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Age</label>
              <input
                onChange={(e) => {
                  setAge(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Yearly Premium
                </label>
              <input
                onChange={(e) => {
                  setYearlyPremium(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <button onClick={addAgePremium} className="btn btn-primary">Add Age-Premium</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={nextPage} className="btn btn-success">Next Page</button>
            </div>
          </FormControl>
        </div>
        <div className="col"></div>
      </div>

    </div>
  )
}

export default AddAgePremium