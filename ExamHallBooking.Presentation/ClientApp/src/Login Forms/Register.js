﻿import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login_rejister.css'; // Import the CSS file
import backgroundImage from '../assest/Background1.png'; // Import your background image
import NavBar from "../NavBar/NavBar.js"; // Make sure the path is correct

function Register() {
    const [id, setId] = useState('0');
    const [loginName, setLoginName] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    function validateEmail(email) {
        // Regular expression for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function AddUser() {

        let formErrors = {};

        // Check if name, loginName, password, and mobile are not empty
        if (name.trim() === '') {
            formErrors.name = "Name is required.";
        }
        if (loginName.trim() === '') {
            formErrors.loginName = "Login email is required.";
        } else if (!validateEmail(loginName)) {
            formErrors.loginName = "Please enter a valid email address.";
        }
        if (password.trim() === '') {
            formErrors.password = "Password is required.";
        }
        if (mobile.trim() === '') {
            formErrors.mobile = "Mobile number is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            // Show an alert message with all errors
            alert(Object.values(formErrors).join('\n'));
            return;
        }

        let items = { id, loginName, name, mobile, password, status };

        console.warn(items);

        fetch('https://localhost:44418/api/Users/AddUsers', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(items)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                navigate("/login");
                alert(resp.statusMessage);
            });
        });
    }

    const handleMainClick = () => {
        window.location.href = '/';
    };

    const handleUserClick = () => {
        window.location.href = '/login';
    };

    const handleAdminClick = () => {
        window.location.href = '/adminLogin';
    };

    const handleSignOutClick = () => {
        window.location.href = '/';
    };

    const validateForm = () => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string, set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };

    const Tooltip = ({ message }) => {
        return (
            <div className="tooltip">
                {message}
            </div>
        );
    };

    const validateLoginName = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
            return 'Email is required.';
        } else if (!emailRegex.test(value)) {
            return 'Invalid email address.';
        }
        return '';
    }

    const handleLoginNameChange = (e) => {
        setLoginName(e.target.value);
        setErrors(prev => ({ ...prev, loginName: validateLoginName(e.target.value) }));
    }

    const validateName = (value) => {
        if (!value) {
            return 'Name is required.';
        } 
        return '';
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrors(prev => ({ ...prev, name: validateName(e.target.value) }));
    }

    const validatePassword = (value) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
        if (!value) {
            return 'Password is required.';
        } else if (value.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        } else if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        } else if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        } else if (!hasDigit) {
            return 'Password must contain at least one digit.';
        } else if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return '';
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) }));
    }
    
    const validateMobileNumber = (value) => {
        const mobileRegex = /^0\d{9}$/;
        if (!value) {
            return 'Mobile number is required.';
        } else if (!mobileRegex.test(value)) {
            return 'Invalid mobile number. ';
        }
        return '';
    };

    const handleMobileNumberChange = (e) => {
        setMobile(e.target.value);
        setErrors(prev => ({ ...prev, mobile: validateMobileNumber(e.target.value) }));
    }
    

    return (
        <div>
            <NavBar
                onMainClick={handleMainClick}
                onUserClick={handleUserClick}
                onAdminClick={handleAdminClick}
                showSignOutButton={false}
                onSignOutClick={false}
                showAdminUser={false} // Hide User and Admin
                showHomeBtton={true}
                showCalBtton={false}
            />

            <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="bg-gradient-primary">
                    <div className="container3">
                        <div><input type='hidden' value={id} onChange={(e) => { setId(e.target.value) }}></input> </div>
                        <div><input type='hidden' value={status} onChange={(e) => { setStatus(e.target.value) }}></input> </div>

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row2 justify-content-center">
                                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                                    <div className="col-lg-7">
                                        <div className="p-5">
                                            <div className="text-center2">
                                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                            </div>
                                            <div className="user">
                                                <div className="form-group row">

                                                    <div className="input-container"> 
                                                        <input type="text" className="form-control form-control-user"
                                                            value={name} onChange={(e) => { 
                                                                handleNameChange(e) }}
                                                            placeholder="Name" />
                                                        {errors.name && <Tooltip message={errors.name} />}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="input-container">  
                                                        <input type="text" className="form-control form-control-user"
                                                            value={loginName} onChange={(e) => { handleLoginNameChange(e) }}
                                                            placeholder="Login Email" />
                                                        {errors.loginName && <Tooltip message={errors.loginName} />}
                                                     </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="input-container">
                                                        <input type="password" className="form-control form-control-user"
                                                        value={password} onChange={(e) => { handlePasswordChange(e) }}
                                                        placeholder="Password" />
                                                        {errors.password && <Tooltip message={errors.password} />}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="input-container">
                                                    <input type="text" className="form-control form-control-user"
                                                        value={mobile} onChange={(e) => { handleMobileNumberChange(e) }}
                                                        placeholder="Mobile" />
                                                        {errors.mobile && <Tooltip message={errors.mobile} />}
                                                    </div>

                                                </div>

                                                <button className="btn btn-primary btn-user btn-block" onClick={AddUser}>
                                                    Register Account
                                                </button>
                                                <hr />
                                            </div>
                                            <hr />
                                            <div className="text-center2" style={{ color: 'white' }}>
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center2" style={{ color: 'white' }}>
                                                <a className="small2" href="login">Already have an account? Login!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="vendor/jquery/jquery.min.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
                </div>
            </div>
        </div>
    );
}

export default Register;
