import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../../component/Navbar.js';
import axios from 'axios';
import { URL } from '../../config'
import './index.css'


const Subscribtion = () => {
    const [age, setAge] = useState('')
    const [sumAssured, setSumAssured] = useState('')
    const [premiumType, setPremiumType] = useState('')
    const [premiumAmount, setPremiumAmount] = useState('')
    const [premium, setPremium] = useState('')
    const [policyName, setPolicyName] = useState('')
    const [singlePolicy, setSinglePolicy] = useState('')
    const [policyTermList, setPolicyTermList] = useState([])
    const [policyTerm, setPolicyTerm] = useState()
    const [eachPolicyName, setEachPolicyName] = useState([])
    let [pname] = useState('')
    let [id] = useState('')
    const [ageMin, setAgeMin] = useState()
    const [ageMax, setAgeMax] = useState()


    const searchPolicies = async () => {
        const url = await `${URL}/policy/displaypolicies`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setEachPolicyName(result['data'])
                console.log(eachPolicyName)
            } else {
                toast.error(result['error'])
            }
        })
    }

    const searchPolicyById = () => {
        console.log(2)
        const url = `${URL}/policy/displaypolicybyid/${id}`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setSinglePolicy(result['data'])

            } else {
                toast.error(result['error'])
            }
        })
    }

    const searchTermPolicyById = async () => {
        console.log(1)
        const url = await `${URL}/policy/displaypolicytermbyid/${id}`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setPolicyTermList(result['data'])

            } else {
                toast.error(result['error'])
            }
        })
    }


    // const searchPre=(a)=>{
    //     const url = await `${URL}/yearlypremium/${a}/${age}`;

    // }

    const searchPremium = async (a) => {
        const url = await `${URL}/yearlypremium/${a}/${age}`
        await axios.get(url).then((response) => {
            const result = response.data
            console.log("yearly Premimum"+result)
            if (result['status'] === 'success') {
                const data = result.data
                console.log("data"+data)
                setPremium(data.yearlyPremium)
                console.log("how are"+premium)
                //setPremiumAmount(data.yearlyPremium)

            } else {
                toast.error(result['error'])
            }
        })
    }

    const loadTermData = async (event) => {
        const getTermData = event.target.value;
        // console.log( getTermData)
        const [a, b, c, d, e] = await getTermData.split(",")
        setPolicyTerm(b); setAgeMin(d); setAgeMax(await e);
        event.preventDefault();
        await searchPremium(a)

    }

    const loadPolicyData = async (event) => {
        const getPolicyData = event.target.value;
        [pname, id] = getPolicyData.split(",")
        setPolicyName(pname)
        console.log(pname)
        event.preventDefault();
        await searchTermPolicyById()
        searchPolicyById()
    }




    const calPremiumAmount =  (e) => {
        console.log("hii")
        console.log(age);
        console.log(policyName);
        console.log(sumAssured);
       console.log(premiumType);
       console.log("hii");
       
       const x =parseInt(premiumType);
        
        //setPremiumType(e.target.value)
        const i = 12 / x;
        ///////////////////////////////////////
        if (policyName.length === 0) {
            toast.warning('Please select  policy Name')
        } else if (policyTerm === 0) {
            toast.warning('Please select  Policy Term')
        } else if (age > ageMax || age < ageMin || age.length === 0) {
            toast.warning(`'Age should be between ${ageMin}  and  ${ageMax}'`)
        } else if (sumAssured.length === 0 || sumAssured > singlePolicy.maxSumAssured || sumAssured < singlePolicy.minSumAssured) {
            toast.warning(`'Sum Assured Should be Between ${singlePolicy.minSumAssured} and ${singlePolicy.maxSumAssured}'`)
        } else if (sumAssured % 100000 != 0) {
            toast.warning('Sum Assured Should be multiple of 1 Lac ')
        } else {
            const beta = () => {
                const s=(parseInt)(Math.ceil(parseInt(premium) * parseInt(sumAssured) / parseInt(singlePolicy.minSumAssured) / parseInt(i)));
                setPremiumAmount(s);
                
            }
             beta()
            if (isNaN(parseInt(premiumAmount))) {
                toast.warning('Please re-select Policy Term & Installmenmt Type ')
            }
            console.log(premiumType)
        }
    }
    // load the data in the beginning
    useEffect(() => {
        searchPolicies()
        console.log('getting called')
    }, [])


    return (
        <div>
            <Navbar />
            <h1 id="big" >Calculate Premium</h1>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="form">
                        <div id="gender">
                            <label htmlFor="" className="label-control">
                                Policy
                            </label>
                            <select onChange={(e) => loadPolicyData(e)
                            } className="form-select" aria-label="Default select example">
                                <option defaultValue>-----Select----</option>
                                {eachPolicyName.map(name => (
                                    <option value={[name.name, name.policyId]}   >
                                        {name.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Age
                            </label>
                            <input
                                onChange={(e) => {
                                    setAge(e.target.value)
                                }}
                                type="number"
                                className="form-control"
                            />
                        </div>

                        <div id="gender" >
                            <label htmlFor="" className="label-control">
                                Select Policy Term
                            </label>
                            <select onChange={(e) => loadTermData(e)
                            } className="form-select" aria-label="Default select example">
                                <option defaultValue >(Policy Term (Payable Term))</option>
                                {policyTermList.map(name => (
                                    <option value={[name.termId, name.policyTerm, name.payableTerm, name.ageIn, name.ageMax]}  >
                                        {name.policyTerm}({name.payableTerm})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Sum Assured
                            </label>
                            <input
                                onChange={(e) => {
                                    setSumAssured(e.target.value)
                                }}
                                type="number"
                                className="form-control"
                            />
                        </div>

                        <div id="gender"  >
                            <label htmlFor="" className="label-control">
                                Installment Type
                            </label>
                            <select onChange={(e) => setPremiumType(e.target.value)
                            } className="form-select" aria-label="Default select example">
                                <option defaultValue>Select Installment</option>
                                <option value="1">Monthly</option>
                                <option value="3">Quarterly</option>
                                <option value="12">Yearly</option>
                            </select>
                        </div>
                        {/* <div>{premiumAmount}</div> */}

                        {premiumAmount && <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Premium Amount
                            </label>
                            <input readOnly="readOnly"
                                value={premiumAmount}
                                type="text"
                                className="form-control"
                            />
                        </div>}

                        

                        <div className="mb-3">
                            <button onClick={calPremiumAmount} className="btn btn-primary">
                                Subscribe
                            </button>
                        </div>

                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>

    )
}

export default Subscribtion