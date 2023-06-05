import { React, useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import NavbarOfficer from '../../component/NavbarOfficer.js'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'



const AddPolicyPayment = () => {
  const navigate = useNavigate()
  

  const { policyName, policyId, Token, loginStatus } = sessionStorage
  const [modeOfPaymentMonth, setModeOfPaymentMonth] = useState('')
  const [gracePeriod, setGracePeriod] = useState('')
  const [rebatePercent, setRebatePercent] = useState('')


  const percentage = 75

  useEffect(() => {
    if (!loginStatus) {
      navigate('/officerLogin')
    }
  }, []);

  

  const addPaymentMode = () => {
    if (modeOfPaymentMonth <= 0 || gracePeriod <= 0 || rebatePercent < 0) {
      toast.warning('please enter valid data')
    } else {

      var rebate = 0
      if (rebatePercent === 0) {
        rebate = 0
      } else {
        rebate = rebatePercent / 100
      }
      const body = {
        modeOfPaymentMonth,
        gracePeriod,
        rebate
      }

      // url to make signin api call
      const url = `${URL}/admin/policy/addpolicypayment/${policyId}`

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

          toast.success('Policy Payment Added Successfully')

         

        } else {
          toast.error('Failed To Insert Data')
        }
      })
    }
  }

  const nextPage = () => {
    sessionStorage.removeItem('policyId')
    sessionStorage.removeItem('policyName')
    navigate('/DisplayPolicy')
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
        <h1>Add New Policy Payment Perks</h1>
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
            <div id="modeOfPaymentMonth"  >
              <label htmlFor="" className="label-control">
                Payment Mode
                        </label>
              <select onClick={(e) => {
                setModeOfPaymentMonth(e.target.value)
              }} className="form-select" aria-label="Default select example">
                <option defaultValue>----Select-----</option>
                <option value="1">Monthly</option>
                <option value="3">Quarterly</option>
                <option value="12">Yearly</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Grace Period (Days)
                        </label>
              <input
                onChange={(e) => {
                  setGracePeriod(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Rebate (%)
                        </label>
              <input
                onChange={(e) => {
                  setRebatePercent(e.target.value)
                }}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <button onClick={addPaymentMode} className="btn btn-primary">Add Policy Payment</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={nextPage} className="btn btn-success">Finish</button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>

  )
}

export default AddPolicyPayment