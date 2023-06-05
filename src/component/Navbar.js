import React from 'react';
import Logo from '../img/logo.png'
import './index.css'
import { useNavigate } from 'react-router';


const Navbar = () => {
    const navigate = useNavigate()
    const { loginStatus, userName } = sessionStorage
    console.log(loginStatus)
    const logoutUser = () => {
        // remove the logged users details from session storage
        sessionStorage.removeItem('loginStatus')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('Token')

        navigate('/')
    }

    return (
        <div >
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" id="nav">
                    <img src={Logo} width="100"  alt="Logo" onClick={() => navigate("/")}></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate("/")}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/MyPolicies")}>My Policies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/PremiumCal")}>Premium Calculator</a>
                            </li>
                            {loginStatus != 1 ?
                                <li className="nav-item dropdown" >
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Signin</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" onClick={() => navigate("/userLogin")}>User</a></li>
                                        <li><a className="dropdown-item" onClick={() => navigate("/officerLogin")}>Officer</a></li>
                                    </ul>
                                </li> :
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Welcome {userName}</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><button className="dropdown-item" onClick={logoutUser}>Logout</button></li>
                                    </ul>
                                </li>
                            }
                                
                              <li className="nav-item" id="right">
                                <a className="nav-link" onClick={() => navigate("/RatingReview")}>Reviews</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar