import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Auth(props) {
    return (
        <div className="d-flex" ><div class="w-100">
            <h3 class="mb-4">{props.name}</h3>
        </div>
            <div class="w-100">
                <p class="social-media d-flex justify-content-end">
                    <Link to="/Auth-Google" style={{
                        color: "#db4a39"
                    }}><FontAwesomeIcon icon={faGoogle} className="social-icon d-flex align-items-center justify-content-center" /></Link>
                    <Link to="/Auth-Facebook" style={{
                        color: "#3b5998"
                    }}><FontAwesomeIcon icon={faFacebook} className="social-icon d-flex align-items-center justify-content-center" /></Link>
                    <Link to="/Auth-Apple" style={{
                        color: "#111111"
                    }}><FontAwesomeIcon icon={faApple} className="social-icon d-flex align-items-center justify-content-center" /></Link>
                </p>
            </div>
        </div >
    )
}

export default Auth