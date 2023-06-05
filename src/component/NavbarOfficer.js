import React from 'react';
import Logo from '../img/logo.png'
import './index.css'
import { useNavigate } from 'react-router'


const Navbar = () => {
    const {name} = sessionStorage

    const navigate = useNavigate()
    const logoutUser = () => {
        // remove the logged users details from session storage
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('regionId')
        sessionStorage.removeItem('officerId')
        sessionStorage.removeItem('loginStatus')
        sessionStorage.removeItem('Token')

        // navigate to sign in component
        navigate('/')
    }

    return (
        <div >
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid" id="nav">
                    <img src={Logo} width="100"  alt="Logo" onClick={() => navigate("/ApprovePolicy")}></img>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" onClick={() => navigate("/ApprovePolicy")}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => navigate("/AddPolicy")}>Add Policies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => navigate("/DisplayPolicy")}>Display Policies</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome {name}</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button class="dropdown-item" onClick={logoutUser}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar