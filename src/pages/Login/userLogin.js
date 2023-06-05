   import { useState } from 'react'
import { Link } from 'react-router-dom'
//import './index.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import Navbar from '../../component/Navbar.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      const url = `${URL}/authenticate/user/signin`
      // make api call using axios
      axios.post(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {
          toast.success('Welcome to the application')
          //////////
         // localStorage['Token']=result.data
          sessionStorage['Token'] = result.data
          const url = `${URL}/user/signin`
          axios.post(url, body, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Authorization": 'Bearer' + result.data,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            // get the server result
            console.log(3)
            const result = response.data
            console.log(result)
            const { id, name } = result['data']
            // persist the logged in user's information for future use
            // we can't send object to session storage but we can send individual table fields
            sessionStorage['userId'] = id
            sessionStorage['userName'] = name
            sessionStorage['loginStatus'] = 1
            console.log(id)
            // navigate to home component
            navigate('/')
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
      <div className="row" >
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
                User SignIn
              </button>
              <div>
                Forgot Password? <Link to="/forgottonPassword">Reset here</Link>
              </div>
              <div>Don't have an account? <Link to="/userSignup">Signup here</Link></div>
              <br />

            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default Login
