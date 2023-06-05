import React from "react";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const EditAgePremium = () => {
  const { agePremiumId,Token ,loginStatus} = sessionStorage;
  const navigate = useNavigate();

  const [age, setAge] = useState();
  const [yearlyPremium, setYearlyPremium] = useState();
  const [termId, setTermId] = useState();

  useEffect(() => {
    if(!loginStatus){
      navigate('/officerLogin')
      }
    loadAgePremium();
  }, []);

  const loadAgePremium = async () => {
    const url = `${URL}/admin/policy/getagepremiumbyid/${agePremiumId}`;
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
        setAge(result.data.age);
        setYearlyPremium(result.data.yearlyPremium);
        setTermId(result.data.policyTerm.termId);
      }
    });
  };

  const saveAgePremium = () => {
    if (age <= 0 && yearlyPremium <= 0) {
      toast.warning("please enter valid data");
    } else {
      const body = {
        age,
        yearlyPremium,
      };

      // url to make signin api call
      const url = `${URL}/admin/policy/editagepremium/${agePremiumId}`;

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
          toast.success("Age-Premium Updated Successfully");
          sessionStorage.removeItem("agePremiumId");
          navigate("/ViewPolicyDetails");
        } else {
          toast.error("Failed to update Age-Premium");
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
        <h2>Age-Premium Details</h2>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Age Premium Id
            </label>
            <input
              type="number"
              readonly
              class="form-control-plaintext"
              id="staticId"
              value={agePremiumId}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Age
            </label>
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Yearly Premium
            </label>
            <input
              value={yearlyPremium}
              onChange={(e) => {
                setYearlyPremium(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Term Id
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
            <button onClick={saveAgePremium} className="btn btn-success">
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgePremium;
