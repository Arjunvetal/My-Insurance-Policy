import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import Navbar from '../../component/Navbar.js'

const ResetPassword = () => {
    const { otp , email} = sessionStorage
    //var otp = sessionStorage.getItem("otp");
    const [userOTP, setUserOTP] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    console.log(otp)
    const navigate = useNavigate()
  
    const resetPassword = () => {
        if (userOTP != otp ) {
            console.log('OTP not matched')
            toast.warning('please enter correct OTP')
        }
        else if (password.length < 6) {
          toast.warning('Password lenght must be more than 6')
        }
        else if (password != confirmPassword) {
          toast.warning('Password does not match...Try again')
        }
        else {
            console.log('YES')
            
            const body = {
                email,
                password
            }

            const url = `${URL}/forgotpassword/resetpassword`

             // make api call using axios
            axios.post(url, body).then((response) => {

            // get the server result
            const result = response.data
            console.log(result)
                if (result['status'] === 'success') {
                
                sessionStorage.removeItem('otp')
                sessionStorage.removeItem('email')
                toast.success('Your password is changed successfully...!')
    
              // navigate to home page
              navigate('/userSignup.js')
            } else {
              toast.error('Failed to reset password')
            }
          })


            // navigate to next page
            navigate('/resetPassword')
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
                  Enter OTP
                </label>
                <input
                  onChange={(e) => {
                    setUserOTP(e.target.value)
                  }}
                  type="number"
                  className="form-control"
                />
              </div>
                        
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Enter New Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
                        
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Confirm New Password
                </label>
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
  
              <div className="mb-3">
                <button onClick={resetPassword} className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
  
  export default ResetPassword