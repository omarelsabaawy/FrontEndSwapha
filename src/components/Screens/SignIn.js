import React from 'react'
import Breadcrumb from '../Standards/Breadcrumb'
import LoginForm from '../Standards/LoginComponent'

function SignIn() {
    return (
        <>
            <Breadcrumb type={"Sign In"} />
            <LoginForm />
        </>
    )
}

export default SignIn