import React from 'react';
import Navbar from '../../component/Navbar.js'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Policy from '../../component/policy.js'
import axios from 'axios'
import { URL } from '../../config'
import { Link } from 'react-router-dom'


const PolicyDetails = () => {
    const { state } = useLocation()
    const [policy, setPolicies] = useState()

    const loadPolicyDetails = () => {
        const { id } = state
        const url = `${URL}/policy/displaypolicybyid/${id}`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result.status === 'success') {
                setPolicies(result.data)
            }
        })
    }

    useEffect(() => {
        loadPolicyDetails()
    }, [])

    return (
        <div>
            <Navbar />
            {policy &&
                <div>
                    <Policy policy={policy} isDetails={true} />
                </div>
            }
            <div align="center"><Link to="/SubscriptionForm">Add new Policy</Link></div>
        </div>

    )
}

export default PolicyDetails