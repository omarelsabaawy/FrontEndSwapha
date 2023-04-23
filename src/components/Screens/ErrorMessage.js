import React from 'react'
import { Helmet } from 'react-helmet-async'
function ErrorMessage(props) {
    return (
        <div>
            <Helmet>
                <title>{props.children}</title>
            </Helmet>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h3>Oops! {props.children} </h3>
                        <h1><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2>we are sorry, an error has been Occurred!</h2>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage