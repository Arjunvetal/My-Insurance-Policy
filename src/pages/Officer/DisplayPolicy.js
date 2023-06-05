import axios from "axios";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import "./index.css";

const DisplayPolicy = () => {
  const {Token ,loginStatus} =sessionStorage
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  // load the data in the beginning
  useEffect(() => {
    if(!loginStatus){
      navigate('/officerLogin')
      }
      sessionStorage.removeItem('policyId')
    searchPolicies();
    
    console.log("searchPolicies getting called");
  }, []);

  const searchPolicies = async () => {
    const url = `${URL}/policy/displaypolicies`;
    axios.get(url , {
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
      if (result["status"] === "success") {
        setPolicies(result["data"]);
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const viewPolicy = (id) => {
    sessionStorage["policyId"] = id;
  };

  return (
    <div>
      <NavbarOfficer />
      <div class="container mt-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-12">
            <div class="rounded">
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th>Policy ID</th>
                      <th>Policy Name</th>
                      <th>Min. Sum Assured</th>
                      <th>Max. Sum Assured</th>
                      <th>Policy Description</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody class="table-body">
                    {policies &&
                      policies.map((policy) => {
                        return (
                          <tr class="cell-1">
                            <td>{policy.policyId}</td>
                            <td>{policy.name}</td>
                            <td>{policy.minSumAssured}</td>
                            <td>{policy.maxSumAssured}</td>
                            <td>{policy.policyDescription}</td>

                            <td>
                              <button
                                onClick={() => {
                                  navigate("/ViewPolicyDetails", {
                                    state: { policy: policy },
                                  });
                                  viewPolicy(policy.policyId);
                                }}
                                className="btn btn-primary"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPolicy;
