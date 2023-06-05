import React from 'react';
import Navbar from '../../component/Navbar.js'
import Policy from '../../component/policy.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { URL } from '../../config'

const Home = () => {

    const [policies, setPolicies] = useState([])

    const searchPolicies = () => {
        const url = `${URL}/policy/displaypolicies`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
           if (result['status'] === 'success') {
                setPolicies(result['data'])
            } else {
                toast.error(result['error'])
            }
        })
    }

    // load the data in the beginning
    useEffect(() => {
        searchPolicies()
        console.log('getting called')
    }, [])


    return (
        <div>
            <Navbar />
            <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <div className="col">
                    {policies.map((policy) => {
                        return <Policy policy={policy} />
                    })}
                </div>
            </div>
        </div>

    )
}

export default Home