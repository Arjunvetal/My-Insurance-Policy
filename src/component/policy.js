import { React } from 'react';
// import { URL } from '../config'
// import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const Policy = (props) => {
  const { policy, isDetails } = props
  const navigate = useNavigate()

  return (
    <div id="box" key={policy.policyId} className="card border-info mb-3" >
      <div className="card-header"><h4><i>{policy.name}</i></h4></div>
      <div className="card-body">
        <h5 className="card-text"><b>Minimum Sum Assured: </b>{policy.minSumAssured}</h5>
        <h5 className="card-text"><b>Maximum Sum Assured: </b>{policy.maxSumAssured}</h5>
        <p className="card-text"><b>Description:</b> {!isDetails
          ? policy.policyDescription.length > 100
            ? policy.policyDescription.substring(0, 100) + '...'
            : policy.policyDescription
          : policy.policyDescription}</p>
      </div>
      {!isDetails &&
      <button
        onClick={() => {
          navigate('/PolicyDetails', { state: { id: policy.policyId } })
        }}
        className="btn btn-link"
      >
        read more
      </button> }
    </div>

  )
}

export default Policy