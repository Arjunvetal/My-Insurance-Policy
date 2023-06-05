import React from "react";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const ViewPolicyDetails = () => {
  const { policyId, Token, loginStatus } = sessionStorage;
  const navigate = useNavigate();
  const [policyName, setPolicyName] = useState();
  const [minSumAssured, setMinSumAssured] = useState();
  const [maxSumAssured, setMaxSumAssured] = useState();
  const [policyDescription, setPolicyDescription] = useState();
  const [policyTerms, setPolicyTerms] = useState([]);
  const [agePremiums, setAgePremiums] = useState([]);
  const [policyPayments, setPolicyPayments] = useState([]);

  useEffect(() => {
    if (!loginStatus) {
      navigate('/officerLogin')
    }
    sessionStorage.removeItem('termId')
    sessionStorage.removeItem('agePremiumId')
    sessionStorage.removeItem('paymentId')

    loadPolicyDetails();
    loadPolicyTerms();
    loadAgePremium();
    loadPolicyPayment();
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

  const loadPolicyTerms = async () => {
    const url = `${URL}/policy/displaypolicytermbyid/${policyId}`;
    await axios.get(url).then((response) => {
      const result = response.data;
      console.log(result);
      if (result["status"] === "success") {
        setPolicyTerms(result.data);
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const loadAgePremium = async () => {
    const url = `${URL}/admin/policy/getagepremiumbypolicyid/${policyId}`;
    await axios.get(url, {
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
        setAgePremiums(result.data);
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const loadPolicyPayment = async () => {
    const url = `${URL}/admin/policy/getpolicypaymentbypolicyid/${policyId}`;
    await axios.get(url, {
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
        setPolicyPayments(result.data);
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const EditTerm = (id) => {
    sessionStorage["termId"] = id;
  };
  const EditAgePremium = (id) => {
    sessionStorage["agePremiumId"] = id;
  };
  const EditPolicyPayment = (id) => {
    sessionStorage["paymentId"] = id;
  };

  return (
    <div>
      <NavbarOfficer />
      <br />
      <br />
      <div>
        <h2>Type of Policy</h2>
        <div class="container ">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Policy Id</th>
                  <th>Policy Name</th>
                  <th>Min. Sum Assured</th>
                  <th>Max. Sum Assured</th>
                  <th>Policy Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr class="cell-1">
                  <td>{policyId}</td>
                  <td>{policyName}</td>
                  <td>{minSumAssured}</td>
                  <td>{maxSumAssured}</td>
                  <td>{policyDescription}</td>

                  <td className="text-center">
                    <button
                      onClick={() => {
                        navigate("/EditTypeOfPolicy");
                      }}
                      className="btn btn-primary"
                    >
                      Edit Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2>Policy Terms</h2>
        <div class="container">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Term ID</th>
                  <th>Policy Term</th>
                  <th>Payable Term</th>
                  <th>Min. Age</th>
                  <th>Max. Age</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody class="table-body">
                {policyTerms &&
                  policyTerms.map((policyTerm) => {
                    return (
                      <tr class="cell-1">
                        <td>{policyTerm.termId}</td>
                        <td>{policyTerm.policyTerm}</td>
                        <td>{policyTerm.payableTerm}</td>
                        <td>{policyTerm.ageIn}</td>
                        <td>{policyTerm.ageMax}</td>

                        <td className="text-center">
                          <button
                            onClick={() => {
                              navigate("/EditPolicyTerm", {
                                state: { policyTerm: policyTerm },
                              });
                              EditTerm(policyTerm.termId);
                            }}
                            className="btn btn-primary"
                          >
                            Edit Details
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

      <div>
        <h2>Age Premiums</h2>
        <div class="container">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Age Premium Id</th>
                  <th>Age</th>
                  <th>Yearly Premium</th>
                  <th>Term Id</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody class="table-body">
                {agePremiums &&
                  agePremiums.map((agePremium) => {
                    return (
                      <tr class="cell-1">
                        <td>{agePremium.agePremiumId}</td>
                        <td>{agePremium.age}</td>
                        <td>{agePremium.yearlyPremium}</td>
                        <td>{agePremium.policyTerm.termId}</td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              navigate("/EditAgePremium", {
                                state: { agePremium: agePremium },
                              });
                              EditAgePremium(agePremium.agePremiumId);
                            }}
                            className="btn btn-primary"
                          >
                            Edit Details
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

      <div>
        <h2>Policy Payments</h2>
        <div class="container">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Payment Id</th>
                  <th>Mode Of Payment(in months)</th>
                  <th>Grace Period(in days)</th>
                  <th>Rebate(in percentage)</th>
                  <th>Policy Id</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody class="table-body">
                {policyPayments &&
                  policyPayments.map((policyPayment) => {
                    return (
                      <tr class="cell-1">
                        <td>{policyPayment.paymentId}</td>
                        <td>{policyPayment.modeOfPaymentMonth}</td>
                        <td>{policyPayment.gracePeriod}</td>
                        <td>{100 * policyPayment.rebate}</td>
                        <td>{policyId}</td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              navigate("/EditPolicyPayment", {
                                state: { policyPayment: policyPayment },
                              });
                              EditPolicyPayment(policyPayment.paymentId);
                            }}
                            className="btn btn-primary"
                          >
                            Edit Details
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
  );
};

export default ViewPolicyDetails;
