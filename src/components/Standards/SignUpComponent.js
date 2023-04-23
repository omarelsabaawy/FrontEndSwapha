import React from 'react';
import './loginStyle.css';
import { Link } from 'react-router-dom';
import Auth from './Auth';
import logo from './SW.png'
import SignUpForm from './SignUpForm';

const SignUpComponent = () => {
    return (
        <>
            <section class="ftco-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 col-lg-10">
                            <div class="wrap d-md-flex">
                                <img className="img" src={logo} alt="logo" />
                                <div class="login-wrap p-4 p-md-5">
                                    <div>
                                        <Auth name="Sign Up" />
                                    </div>
                                    <SignUpForm />
                                    <p class="text-center">Already a member? <Link className='member' to="/signIn" > Sign In </Link> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUpComponent;
