import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import validator from 'validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Hunter from 'hunter';
// const hunter = new Hunter("a92b71c9ded1d06155d2822598ab885a1f48ad99");

// var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

export default function SignUpForm() {
    const country = localStorage.getItem('location');
    const [values, setValues] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        country: country,
        homeAddress: "",
        password: "",
        confirmPassword: "",
    });

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleNext = () => {
        setStep(step + 1);
    }

    const handleBack = () => {
        setStep(step - 1);
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toastOptionsError = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleValidation = () => {
        const { password, confirmPassword, email, username } = values;
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be the same.", toastOptionsError);
            return false;
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptionsError
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptionsError
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptionsError);
            return false;
        } else if (!validator.isEmail(email)) {
            toast.error("Please use valid Email.", toastOptionsError);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (handleValidation()) {
            const { password, email, username, country, phoneNumber, name, homeAddress } = values;
            const { data } = await axios.post('/api/auth/register', {
                name,
                username,
                email,
                phoneNumber,
                country,
                homeAddress,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptionsError);
                setLoading(false);
            } else if (data.status === true) {
                const registerData = data.user;
                navigate('/signIn', { state: { registerData, msg: data.msg, pass: values.password } });
                window.location.reload();
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    {step === 1 && (
                        <>
                            <div className="form-group mb-3">
                                <label className="label" >Name</label>
                                <input type="text" name='name' className="form-control" onChange={(e) => handleChange(e)} value={values.name} placeholder="Name" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" >Username</label>
                                <input type="text" name="username" className="form-control" onChange={(e) => handleChange(e)} value={values.username} placeholder="Username" required />
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={handleNext} style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65' }} className="form-control btn btn-primary rounded submit px-3">Next</button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="form-group mb-3">
                                <label className="label" >Email</label>
                                <input type="email" name='email' className="form-control" onChange={(e) => handleChange(e)} value={values.email} placeholder="Email" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" >Phone Number</label>
                                <input type="tel" name='phoneNumber' className="form-control" onChange={(e) => handleChange(e)} value={values.phoneNumber} placeholder="Phone Number" required />
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={handleBack} style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%' }} className="form-control btn btn-secondary rounded submit px-3">Back</button>
                                <button type="button" onClick={handleNext} style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%', float: 'right' }} className="form-control btn btn-secondary rounded submit px-3">Next</button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="form-group mb-3">
                                <label className="label" >Country</label>
                                <input type="text" name='country' onChange={(e) => handleChange(e)} className="form-control" value={values.country} placeholder="Country" required disabled />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" >Home Address</label>
                                <input type="text" name='homeAddress' className="form-control" onChange={(e) => handleChange(e)} value={values.homeAddress} placeholder="Address" required />
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={handleBack} style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%' }} className="form-control btn btn-secondary rounded submit px-3">Back</button>
                                <button type="button" onClick={handleNext} style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%', float: 'right' }} className="form-control btn btn-secondary rounded submit px-3">Next</button>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <div className="form-group mb-3">
                                <label className="label" >Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id='password'
                                        name='password'
                                        value={values.password}
                                        onChange={(e) => handleChange(e)} placeholder="Password"
                                        required
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type='button'
                                            className="btn btn-secondary"
                                            onClick={togglePasswordVisibility} style={{ backgroundColor: 'white', color: 'black', borderColor: '#ccc', borderLeftColor: '#ccc' }}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" >Confirm Password</label>
                                <div className="input-group">
                                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form-control" id='ConfirmPassword' onChange={(e) => handleChange(e)} value={values.confirmPassword} placeholder="Confirm Password" required />
                                    <div className="input-group-append">
                                        <button
                                            type='button'
                                            className="btn btn-secondary"
                                            onClick={toggleConfirmPasswordVisibility} style={{ backgroundColor: 'white', color: 'black', borderColor: '#ccc', borderLeftColor: '#ccc' }}
                                        >
                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="button"
                                    onClick={handleBack}
                                    style={{
                                        backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%'
                                    }}
                                    className="form-control btn btn-secondary rounded submit px-3">
                                    Back
                                </button>
                                <button type="submit"
                                    style={{
                                        backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65', width: '40%', float: 'right'
                                    }}
                                    className="form-control btn btn-secondary rounded submit px-3">
                                    {loading ?
                                        <Spinner
                                            as="span"
                                            variant="light"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border" />
                                        :
                                        "submit"
                                    }
                                </button>
                            </div>
                        </>
                    )}
                </form>
                <ToastContainer />
            </div>
        </>
    );
}


