import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import Navbar from '../../component/Navbar.js'

const OfficerLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [officer, setOfficer] = useState([])

  const navigate = useNavigate()

  const signinUser = () => {
    if (email.length === 0) {
      toast.warning('please enter email')
    } else if (password.length === 0) {
      toast.warning('please enter password')
    } else {
      const body = {
        email,
        password
      }

      // url to make signin api call
      const url = `${URL}/authenticate/officer/signin`

      // make api call using axios
      axios.post(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {
          toast.success('Welcome to the application')
          ///////////////////
          sessionStorage['Token'] = result.data
          console.log(1)
          const url = `${URL}/admin/signin`
          console.log(2)
          axios.post(url, body, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Authorization": 'Bearer' + result.data,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => {

            const result = response.data
            setOfficer(result['data'])
            console.log("FTER OFFUCER LOGIN "+ result)
            const { name, officerId, regionId } = result['data']
            // persist the logged in user's information for future use
            sessionStorage['name'] = name
            sessionStorage['officerId'] = officerId
            sessionStorage['regionId'] = regionId
            sessionStorage['loginStatus'] = 1
            // navigate to home component
            navigate('/DisplayPolicy')
          })
        } else {
          toast.error('Invalid user name or password')
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
        <div className="col-3"></div>
        <div className="col-4">
          <div className="form">
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Email address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Password
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
              <button onClick={signinUser} className="btn btn-primary">
                Officer SignIn
              </button>
            </div>
          </div>
        </div>
        <div className="col-5"></div>
      </div>
    </div>
  )
}

export default OfficerLogin
