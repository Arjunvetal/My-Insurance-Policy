import Home from "./pages/Home";
import Login from "./pages/Login/userLogin.js";
import OfficerLogin from "./pages/Login/officerLogin.js";
import MyPolicies from "./pages/MyPolicies";
import AddPolicy from "./pages/Officer/AddPolicy.js";
import AddPolicyTerms from "./pages/Officer/AddPolicyTerms";
import AddAgePremium from "./pages/Officer/AddAgePremium";
import AddPolicyPayment from "./pages/Officer/AddPolicyPayment";
import ApprovePOlicy from "./pages/Officer/ApprovePolicy.js";
import DisplayPolicy from "./pages/Officer/DisplayPolicy.js";
import ViewPolicyDetails from "./pages/Officer/ViewPolicyDetails";
import EditTypeOfPolicy from "./pages/Officer/EditTypeOfPolicy";
import EditPolicyTerm from "./pages/Officer/EditPolicyTerm";
import EditAgePremium from "./pages/Officer/EditAgePremium";
import EditPolicyPayment from "./pages/Officer/EditPolicyPayment";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCal from "./pages/PremiumCal";
import SubscriptionForm from "./pages/Subscription";
import UserSignup from "./pages/Signup/userSignup.js";
import ForgottonPassword from "./pages/ForgotPassword/forgottonPassword.js";
import ResetPassword from "./pages/ForgotPassword/resetPassword.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { Rating } from "@mui/material";
import RatingReview from "./component/Rating";
import AddFeedback from "./pages/MyPolicies/Addfeedback";
import Addfeedback from "./pages/MyPolicies/Addfeedback";

function App() {
  return (
    <div  id="apps">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userLogin" element={<Login />} />
          <Route path="/officerLogin" element={<OfficerLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/MyPolicies" element={<MyPolicies />} />
          <Route path="/AddPolicy" element={<AddPolicy />} />
          <Route path="/AddPolicyTerms" element={<AddPolicyTerms />} />
          <Route path="/AddAgePremium" element={<AddAgePremium />} />
          <Route path="/AddPolicyPayment" element={<AddPolicyPayment />} />
          <Route path="/ApprovePolicy" element={<ApprovePOlicy />} />
          <Route path="/ViewPolicyDetails" element={<ViewPolicyDetails />} />
          <Route path="/EditTypeOfPolicy" element={<EditTypeOfPolicy />} />
          <Route path="/EditPolicyTerm" element={<EditPolicyTerm />} />
          <Route path="/EditAgePremium" element={<EditAgePremium />} />
          <Route path="/EditPolicyPayment" element={<EditPolicyPayment />} />
          <Route path="/DisplayPolicy" element={<DisplayPolicy />} />
          <Route path="/PolicyDetails" element={<PolicyDetails />} />
          <Route path="/PremiumCal" element={<PremiumCal />} />
          <Route path="/SubscriptionForm" element={<SubscriptionForm />} />
          <Route path="/ForgottonPassword" element={<ForgottonPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/RatingReview" element={<RatingReview/>} /> 
          <Route path="/Addfeedback" element={<Addfeedback/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
