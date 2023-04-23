import React from 'react';
import './loginStyle.css';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm'
import Auth from './Auth';
import logo from './SW.png'

const LoginComponent = () => {
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
                                        <Auth name="Sign In" />
                                    </div>
                                    <LoginForm />
                                    <p class="text-center">Not a member? <Link data-toggle="tab" className='member' to="/signUp">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginComponent;
