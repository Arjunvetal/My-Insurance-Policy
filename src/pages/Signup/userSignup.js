import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import './index.css'
import Navbar from '../../component/Navbar.js'

const Signup = () => {
    const [name, setName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // used to navigate from one component to another
    const navigate = useNavigate()

    const ValidateEmail = (inputText) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailformat.test(inputText)) {
           
            return true;
        }
        else {
            
            return false;
        }
    }
    const ValidatePassword= (inputTextpass) => {
        var pass=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}/;
        if(pass.test(inputTextpass)){
            return true;
        }
        else{
            return  false;
        }


    }


    const signupUser = () => {
        if (name.length === 0) {
            toast.warning('Please enter  name')
        } else if (!ValidateEmail(emailId)) {
            toast.warning('Please enter valid email')
        } else if (mobile.length >10 || mobile.length <10 ) {
            toast.warning('Please enter Valid Mobile number')
        } else if (gender === "Select Gender" || gender.length=== 0 ) {
            toast.warning('Please Select Gender')
        } else if (!ValidatePassword(password)) {
            toast.warning('Please enter valid password')    
        }
        // else if (password.length === 0) {
        //     toast.warning('Please enter password')
         else if (confirmPassword.length === 0) {
            toast.warning('Please confirm your password')
        } else if (password !== confirmPassword) {
            toast.warning('Password does not match')
        } else {
            const body = {
                name,
                emailId,
                mobile,
                gender,
                password,
            }
            // console.log(body)

            // url to call the api
            const url = `${URL}/authenticate/user/signup`

            // http method: post
            // body: contains the data to be sent to the API
            axios.post(url, body).then((response) => {
                // get the data from the response
                const result = response.data
                console.log(result)
                if (result['status'] === 'success') {
                    toast.success('Successfully signed up new user')

                    // navigate to the signin page
                    navigate('/userLogin')
                } else {
                    toast.error(result['error'])
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
                                Name
              </label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>



                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Email Address
              </label>
                            <input
                                onChange={(e) => {
                                    setEmailId(e.target.value)
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Mobile No.
              </label>
                            <input
                                onChange={(e) => {
                                    setMobile(e.target.value)
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div id="gender"  >
                            <select onClick={(e) => {
                                setGender(e.target.value)
                            }} className="form-select" aria-label="Default select example">
                                <option defaultValue>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="LGBTQ">Prfer not to specify</option>
                            </select>
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
                            <label htmlFor="" className="label-control">
                                Confirm Password
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
                            <div>
                                Already have an account? <Link to="/userLogin">Signin here.</Link>
                            </div>
                            <button onClick={signupUser} className="btn btn-primary">
                                User Signup
              </button>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Signup
