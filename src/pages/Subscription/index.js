import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Navbar from '../../component/Navbar.js';
import axios from 'axios';
import { URL } from '../../config'
import './index.css'


const Subscribtion = () => {
    const navigate = useNavigate()
    const { userId, loginStatus, Token } = sessionStorage
    if (!loginStatus) {
        navigate('/userLogin')
    }
    const [policyHolderName, setName] = useState('')
    const [age, setAge] = useState('')
    const [sumAssured, setSumAssured] = useState('')
    const [premiumType, setPremiumType] = useState('')
    const [policyHolderRelation, setPolicyHolderRelation] = useState('')
    const [gender, setGender] = useState('')
    const [nominee, setNominee] = useState('')
    const [premiumAmount, setPremiumAmount] = useState()
    const [premium, setPremium] = useState()
    const [regionId, setRegionId] = useState('')
    const [policyName, setPolicyName] = useState('')
    const [singlePolicy, setSinglePolicy] = useState('')
    const [policyTermList, setPolicyTermList] = useState([])
    const [policyTerm, setPolicyTerm] = useState()
    const [eachPolicyName, setEachPolicyName] = useState([])
    let [pname, setPname] = useState('')
    let [id, setId] = useState('')
    const [termId, setTermId] = useState()
    const [paybleTerm, setPayableTerm] = useState()
    const [ageMin, setAgeMin] = useState()
    const [ageMax, setAgeMax] = useState()
    const [regionList, setRegionList] = useState([])
    const [file, setFile] = useState()
    const [siz, setSize] = useState()





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

    const onFileChangeHandler = async (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
        setSize(await e.target.files[0].size)
        console.log(siz)
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

    const searchPremium = async (a) => {
        const url = await `${URL}/yearlypremium/${a}/${age}`
        await axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                const data = result.data
                console.log(data)
                setPremium(data.yearlyPremium)
                console.log(premium)
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
        setTermId(await a); setPolicyTerm(b); setPayableTerm(c); setAgeMin(d); setAgeMax(await e);
        //  console.log(termTerm)
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

    const searchRegion = async () => {
        const url = await `${URL}/region`
        axios.get(url).then((response) => {
            const result = response.data
            console.log(result)
            if (result['status'] === 'success') {
                setRegionList(result['data'])
                console.log(eachPolicyName)
            } else {
                toast.error(result['error'])
            }
        })
    }

    const calPremiumAmount = async (e) => {
        e.preventDefault();
        setPremiumType(e.target.value)
        const i = 12 / e.target.value
        console.log(i)
        const beta = (e) => {
            setPremiumAmount(Math.ceil(premium * sumAssured / singlePolicy.minSumAssured / i))
        }
        await beta(i)
        console.log(premiumType)
    }

    // load the data in the beginning
    useEffect(() => {
        searchPolicies()
        searchRegion()

        console.log('getting called')
    }, [])

    function validateUsername(username) {
        const pattern = /^[a-zA-Z_]+$/;
        if(pattern.test(username)){
            return true;
        }
        else{
            return  false;
        }
      }


      //policyHolderName.length === 0
    const SubscribePolicy = () => {
        if (!validateUsername(policyHolderName)) {
            toast.warning('Please enter valid  username')
        } else if (gender === "Select Gender") {
            toast.warning('Please select gender')
        } else if (policyName.length === 0) {
            toast.warning('Please select  policy Name')
        } else if (policyTerm === 0) {
            toast.warning('Please select  Policy Term')
        } else if (age > ageMax || age < ageMin || age.length === 0) {
            toast.warning(`'Age should be between ${ageMin}  and  ${ageMax}'`)
        } else if (sumAssured.length === 0 || sumAssured > singlePolicy.maxSumAssured || sumAssured < singlePolicy.minSumAssured) {
            toast.warning(`'Sum Assured Should be Between ${singlePolicy.minSumAssured} and ${singlePolicy.maxSumAssured}'`)
        } else if (sumAssured % 100000 != 0) {
            toast.warning('Sum Assured Should be multiple of 1 Lac ')
        } else if (premiumType.length === 0) {
            toast.warning('Please enter your Installment type')
        } else if (!validateUsername(policyHolderRelation)) {
            toast.warning('Please enter correct relation with policy holder')
        } else if (!validateUsername(nominee)) {                            //nominee.length === 0   ,policyHolderRelation.length === 0
            toast.warning('Please enter correct nominee valid name')
        } else if (regionId === "Select Region") {
            toast.warning('Please select region ')
        } else if (typeof (file) === "undefined") {
            toast.warning('Please Upload File ')
        } else if (siz >= 1048500 || siz <= 0) {
            toast.warning('Please Upload File having size less than 1MB ')
        } else if (isNaN(premiumAmount)) {
            toast.warning('Please re-select Policy Term & Installmenmt Type ')
        } else {
            const body = {
                userId,
                policyHolderName,
                age,
                policyName,
                sumAssured,
                premiumType,
                policyTerm,
                paybleTerm,
                policyHolderRelation,
                gender,
                nominee,
                premiumAmount,
                regionId
            }
            console.log(file)
            const url = `${URL}/user/subscribe`
            axios.post(url, body, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Authorization": 'Bearer' + Token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // get the data from the response
                const result = response.data
                console.log(result)
                if (result['status'] === 'success') {
                    const formData = new FormData();
                    formData.append('file', file);
                    const url = `${URL}/user/addidproof/${result.data}`
                    axios.post(url, formData, {
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
                            toast.success('Successfully Subscribed ')

                            // navigate to the signin page
                            navigate('/myPolicies')
                        } else {
                            toast.error(result['error'])
                            console.log(result.error)
                        }
                    })
                } else {
                    toast.error(result['error'])
                    console.log(result.error)
                }
            })
        }

    }
    return (
        <div style={{ backgroundColor: "lightblue"}}  >
            <Navbar />
            <br />
            <h1><center>Subscription Form</center></h1>
            <br />
            <div className="row" >
                <div className="col"></div>
                <div className="col">
                    <div className="form">
                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Policy Holder Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value)
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

                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Relation With Policy Holder
                            </label>
                            <input
                                onChange={(e) => {
                                    setPolicyHolderRelation(e.target.value)
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div id="gender" >
                            <label htmlFor="" className="label-control">
                                Select Policy Term
                            </label>
                            <select onClick={(e) => loadTermData(e)
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
                            <select onClick={(e) => calPremiumAmount(e)
                            } className="form-select" aria-label="Default select example">
                                <option defaultValue>Select Installment</option>
                                <option value="1">Monthly</option>
                                <option value="3">Quarterly</option>
                                <option value="12">Yearly</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="label-control">
                                Nominee Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setNominee(e.target.value)
                                }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div id="gender"  >
                            <label htmlFor="" className="label-control">
                                Region
                            </label>
                            <select onClick={(e) => {
                                setRegionId(e.target.value)
                            }} className="form-select" aria-label="Default select example">
                                <option defaultValue >Select Region</option>
                                {regionList.map(name => (
                                    <option value={name.regionId}  >
                                        {name.regionName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id="gender" className="form-group files color">
                            <label>Upload Document </label>
                            <input type="file" className="form-control" name="file" onChange={(e) => onFileChangeHandler(e)} />
                        </div>

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
                            <button onClick={SubscribePolicy} className="btn btn-primary">
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