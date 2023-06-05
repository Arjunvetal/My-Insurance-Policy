import React from "react";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const EditTypeOfPolicy = () => {
  const { policyId,Token,loginStatus } = sessionStorage;
  const navigate = useNavigate();

  const [policyName, setPolicyName] = useState();
  const [minSumAssured, setMinSumAssured] = useState();
  const [maxSumAssured, setMaxSumAssured] = useState();
  const [policyDescription, setPolicyDescription] = useState();

  useEffect(() => {
    if(!loginStatus){
      navigate('/officerLogin')
      }
    loadPolicyDetails();
  }, []);

  const loadPolicyDetails = async () => {
    const url = `${URL}/policy/displaypolicybyid/${policyId}`;
    await axios.get(url).then((response) => {
      const result = response.data;
      console.log(result);
      if (result.status === "success") {
        setPolicyName(result.data.name);
        setMinSumAssured(result.data.minSumAssured);
        setMaxSumAssured(result.data.maxSumAssured);
        setPolicyDescription(result.data.policyDescription);
      }
    });
  };
  const saveTypeOfPolicy = () => {
    if (
      policyName.length === 0 &&
      minSumAssured < 0 &&
      maxSumAssured < minSumAssured &&
      policyDescription.length === 0
    ) {
      toast.warning("please enter valid data");
    } else {
      const name = policyName;
      const body = {
        name,
        minSumAssured,
        maxSumAssured,
        policyDescription,
      };

      // url to make signin api call
      const url = `${URL}/admin/policy/edittypeofpolicy/${policyId}`;

      // make api call using axios
      axios.put(url, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Authorization": 'Bearer' + Token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // get the server result
        const result = response.data;
        console.log(result);
        if (result["status"] === "success") {
          toast.success("Policy Type Updated Successfully");
          navigate("/ViewPolicyDetails");
        } else {
          toast.error("Failed to update policy type");
        }
      });
    }
  };

  return (
    <div>
      <NavbarOfficer />
      <br />
      <br />
      <div>
        <h2>Type of Policy</h2>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Policy Id
            </label>
            <input
              type="number"
              readonly
              class="form-control-plaintext"
              id="staticId"
              value={policyId}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Policy Name
            </label>
            <input
              value={policyName}
              onChange={(e) => {
                setPolicyName(e.target.value);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Min. Sum Assured
            </label>
            <input
              value={minSumAssured}
              onChange={(e) => {
                setMinSumAssured(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Max. Sum Assured
            </label>
            <input
              value={maxSumAssured}
              onChange={(e) => {
                setMaxSumAssured(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Policy Description
            </label>
           <textarea
              value={policyDescription}
              onChange={(e) => {
                setPolicyDescription(e.target.value);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <button onClick={saveTypeOfPolicy} className="btn btn-success">
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTypeOfPolicy;
