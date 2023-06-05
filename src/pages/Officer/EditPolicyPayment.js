import React from "react";
import NavbarOfficer from "../../component/NavbarOfficer.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const EditPolicyPayment = () => {
  const { paymentId, policyId, Token, loginStatus } = sessionStorage;
  const navigate = useNavigate();

  const [modeOfPaymentMonth, setModeOfPaymentMonth] = useState();
  const [gracePeriod, setGracePeriod] = useState();
  const [rebate, setRebate] = useState();

  useEffect(() => {
    if(!loginStatus){
      navigate('/officerLogin')
      }
    loadPolicyPayment();
  }, []);

  const loadPolicyPayment = async () => {
    const url = `${URL}/admin/policy/getpolicypaymentbyid/${paymentId}`;
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
        setModeOfPaymentMonth(result.data.modeOfPaymentMonth);
        setGracePeriod(result.data.gracePeriod);
        setRebate(result.data.rebate);
      }
    });
  };

  const savePolicyPayment = () => {
    console.log(modeOfPaymentMonth)
    console.log(gracePeriod)
    console.log(rebate)
    console.log(paymentId)
    if (modeOfPaymentMonth <= 0 || gracePeriod < 0 || rebate < 0) {
      toast.warning("please enter valid data");
    } else {
      const body = {
        modeOfPaymentMonth,
        gracePeriod,
        rebate,
      };

      // url to make signin api call
      const url = `${URL}/admin/policy/editpolicypayment/${paymentId}`;

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
          toast.success("Policy Payment Updated Successfully");
          //sessionStorage.removeItem("paymentId");
          navigate("/ViewPolicyDetails");
        } else {
          toast.error("Failed to update Policy Payment");
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
        <h2>Policy Payment Details</h2>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Payment Id
            </label>
            <input
              type="number"
              readonly
              class="form-control-plaintext"
              id="staticId"
              value={paymentId}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Mode Of Payment(in months)
            </label>
            <input
              value={modeOfPaymentMonth}
              onChange={(e) => {
                setModeOfPaymentMonth(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Grace Period(in days)
            </label>
            <input
              value={gracePeriod}
              onChange={(e) => {
                setGracePeriod(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="label-control">
              Rebate
            </label>
            <input
              value={rebate}
              onChange={(e) => {
                setRebate(e.target.value);
              }}
              type="number"
              className="form-control"
            />
          </div>

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
            <button onClick={savePolicyPayment} className="btn btn-success">
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPolicyPayment;
