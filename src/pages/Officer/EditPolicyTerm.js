import React from "react";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const EditPolicyTerm = () => {
  const { termId ,Token ,loginStatus} = sessionStorage;
  const navigate = useNavigate();

  const [policyTerm, setPolicyTerm] = useState();
  const [payableTerm, setPayableTerm] = useState();
  const [ageIn, setAgeIn] = useState();
  const [ageMax, setAgeMax] = useState();

  useEffect(() => {
    if(!loginStatus){
      navigate('/officerLogin')
      }
    loadPolicyTerm();
  }, []);

  const loadPolicyTerm = async () => {
    const url = `${URL}/admin/policy/getpolicytermbyid/${termId}`;
    await axios.get(url , {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Authorization": 'Bearer' + Token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const result = response.data;
      console.log(result);
      if (result.status === "success") {
        setPolicyTerm(result.data.policyTerm);
        setPayableTerm(result.data.payableTerm);
        setAgeIn(result.data.ageIn);
        setAgeMax(result.data.ageMax);
      }
    });
  };

  const savePolicyTerm = () => {
    if (policyTerm <= 0 && payableTerm <= 0 && ageIn <= 0 && ageMax < ageIn) {
      toast.warning("please enter valid data");
    } else {
      const body = {
        policyTerm,
        payableTerm,
        ageIn,
        ageMax,
      };

      // url to make signin api call
      const url = `${URL}/admin/policy/editpolicyterm/${termId}`;

      // make api call using axios
      axios.put(url, body , {
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
          toast.success("Policy Term Updated Successfully");
          sessionStorage.removeItem("termId");
          navigate("/ViewPolicyDetails");
        } else {
          toast.error("Failed to update policy term");
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
        <h2>Policy Term Details</h2>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Policy Term Id
            </label>
            <input
              type="number"
              readonly
              class="form-control-plaintext"
              id="staticId"
              value={termId}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Policy Term
            </label>
            <input
              value={policyTerm}
              onChange={(e) => {
                setPolicyTerm(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Payable Term
            </label>
            <input
              value={payableTerm}
              onChange={(e) => {
                setPayableTerm(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Min. Age
            </label>
            <input
              value={ageIn}
              onChange={(e) => {
                setAgeIn(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Max. Age
            </label>
            <input
              value={ageMax}
              onChange={(e) => {
                setAgeMax(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <button onClick={savePolicyTerm} className="btn btn-success">
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPolicyTerm;
