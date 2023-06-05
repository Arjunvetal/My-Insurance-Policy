import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import Navbar from '../../component/Navbar.js'

const ForgottonPassword = () => {
    const [email, setEmail] = useState('')
    
  
    const navigate = useNavigate()
  
    const generateOTP = () => {
      if (email.length === 0 ) {
        toast.warning('please enter email')
      } else {
        const body = {
          email
        }
  
        // url to make signin api call
        const url = `${URL}/forgotpassword/sendotp`
  
        // make api call using axios
        axios.post(url, body).then((response) => {
          // get the server result
          const result = response.data
          console.log(result)
          if (result['status'] === 'success') {
            

            sessionStorage['otp'] = result['data']
            sessionStorage['email'] = email
            toast.success('OTP sent on your email')
  
            // navigate to next page
            navigate('/resetPassword')
          } else {
            toast.error('No user is registered with this email / OTP generation failed')
          }
        })
      }
    }
  
    return (
      <div>
        <Navbar />
       <br />
       <br />
  
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="form">
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Email address
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
  
              <div className="mb-3">
                <button onClick={generateOTP} className="btn btn-primary">
                  Generate OTP
                </button>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
  
  export default ForgottonPassword