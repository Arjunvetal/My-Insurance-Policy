import React from 'react';
import Navbar from '../../component/Navbar.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { URL } from '../../config'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import './index.css'


const MyPolicy = () => {
    const navigate = useNavigate()
    const { userId, Token } = sessionStorage
    const [policies, setPolicies] = useState([])

    const searchPolicies = async () => {
        const url = `${URL}/user/getpolicybyuserid/${userId}`
        axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Authorization": 'Bearer' + await Token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setPolicies(result['data'])
                console.log(policies)
            } else {
                toast.error(result['error'])
            }
        })
    }

    // load the data in the beginning
    useEffect(() => {
        if (!userId) {
            navigate('/userLogin')
        }
        searchPolicies()
        console.log('getting called')
    }, [])

    return (
        <div>
            <Navbar />
            <h1 align="centre">Your Policies List</h1>
            <div align="right"><button id="a" className="btn btn-primary">
            <Link id="a" to="/SubscriptionForm">Add new Policy</Link>
            
              </button>
              <button type="button" class="btn btn-info"><Link id="a" to="/Addfeedback">Add Feedback</Link></button>
            </div>
            <div class="container-fluid">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="simple-head">
                                <th width="20%">
                                    <div class="bg-white h-100 w-100"> </div>
                                </th>
                                <th width="20%">
                                    <div class="mb-2">
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Policy Holder Name</th>
                                {policies.map((policy) => {
                                    return <td>{policy.policyHolderName}</td>
                                })}

                            </tr>
                            <tr>
                                <th scope="row">Age</th>
                                {policies.map((policy) => {
                                    return <td>{policy.age}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Relation with Policy Holder</th>
                                {policies.map((policy) => {
                                    return <td>{policy.policyHolderRelation}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Policy Name</th>
                                {policies.map((policy) => {
                                    return <td>{policy.policyName}</td>
                                })}

                            </tr>
                            <tr>
                                <th scope="row">Policy Term</th>
                                {policies.map((policy) => {
                                    return <td>{policy.policyTerm}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Payable Term</th>
                                {policies.map((policy) => {
                                    return <td>{policy.paybleTerm}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Policy Date</th>
                                {policies.map((policy) => {
                                    return <td>{policy.policyDate}</td>
                                })}

                            </tr>
                            <tr>
                                <th scope="row">Sum Assured</th>
                                {policies.map((policy) => {
                                    return <td>{policy.sumAssured}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Yearly Installments </th>
                                {policies.map((policy) => {
                                    return <td>{12 / policy.premiumType}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Paid Premiums</th>
                                {policies.map((policy) => {
                                    return <td>{policy.paidPremiums}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Premium Amount</th>
                                {policies.map((policy) => {
                                    return <td>{policy.premiumAmount}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Maturity Date</th>
                                {policies.map((policy) => {
                                    return <td>{policy.maturityDate}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Nominee</th>
                                {policies.map((policy) => {
                                    return <td>{policy.nominee}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Verification Status</th>
                                {policies.map((policy) => {
                                    return <td>{policy.verificationStatus}</td>
                                })}
                            </tr>
                            <tr>
                                <th scope="row">Verification Comment</th>
                                {policies.map((policy) => {
                                    return <td>{policy.verificationComment}</td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyPolicy