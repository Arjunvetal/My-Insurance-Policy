import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import NavbarOfficer from '../../component/NavbarOfficer.js';
import { URL } from '../../config';
import './index.css';


const ApprovePolicy = () => {
    const {  regionId, Token, loginStatus } = sessionStorage
    const [pendingPolicies, setPendingPolicies] = useState([])
    let [returnValue, setReturnValue] = useState([])
    const [comment, setComment] = useState('')
    const [id, setId] = useState('')
    const [i, setI] = useState('')
    const navigate = useNavigate()


    const searchPendingPolicies = async () => {
        const url = `${URL}/admin/policies/${regionId}`
        axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Authorization": 'Bearer' + Token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setPendingPolicies(result['data'])

            } else {
                toast.error(result['error'])
            }
        })
    }

    const approvepolicy = (e) => {
        const url = `${URL}/admin/approve/${e.target.value}`
        axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Authorization": 'Bearer' + Token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                toast.success("Policy Approved!!!")
                setReturnValue(Math.random())
                console.log(returnValue)
            } else {
                toast.error(result['error'])
            }
        })
        //searchPendingPolicies()
    }

    const rejectpolicy = async () => {

        const url = `${URL}/admin/reject/${i}/${comment}`
        axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Authorization": 'Bearer ' + Token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                toast.success("Policy Rejected!!!")
                setComment('')
                setReturnValue(Math.random())
            } else {
                toast.error(result['error'])

            }

        })

    }

    useEffect(() => {
        if (!loginStatus) {
            navigate('/officerLogin')
        }
        searchPendingPolicies()

        console.log('getting called')
    }, [returnValue])


    return (
        <div>
            <NavbarOfficer />
            <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-11">
                        <div class="rounded">
                            <div class="table-responsive table-borderless">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Name </th>
                                            <th>Age</th>
                                            <th>Policy Name</th>
                                            <th>Applied Date</th>
                                            <th>Policy Term</th>
                                            <th>Payable Term</th>
                                            <th>Sum Assured</th>
                                            <th>Document</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-body">
                                        {pendingPolicies && pendingPolicies.map((policies) => {
                                            return <tr class="cell-1">
                                                <td>{policies.policyHolderName}</td>
                                                <td>{policies.age}</td>
                                                <td>{policies.policyName}</td>
                                                <td>{policies.policyDate}</td>
                                                <td>{policies.policyTerm}</td>
                                                <td>{policies.paybleTerm}</td>
                                                <td>{policies.sumAssured}</td>
                                                <td><button id="but" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={(e) => setId(e.target.value)} value={policies.userPolicyId}>Document</button></td>

                                                <td><button id="but" className="btn btn-success btn-sm" onClick={(e) => approvepolicy(e)} value={policies.userPolicyId}>Approve</button>
                                                &nbsp;&nbsp;
                                                    <button id="but" type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => setI(e.target.value)} value={policies.userPolicyId}>Reject</button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Please specify reason  </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3>
                                <input type="text" width="1000" onChange={(e) => {
                                    setComment(e.target.value)
                                }}></input>
                            </h3>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => rejectpolicy()} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div id="ss" class="modal-dialog">
                    <div id="doc" class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Document </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="doc1" class="modal-body">
                            <img id="img" src={`${URL}/attachment/${id}`} type="image/png" class="rounded float-end" alt="Image not Available" ></img>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApprovePolicy