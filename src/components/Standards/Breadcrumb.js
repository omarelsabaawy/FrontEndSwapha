import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'

function Breadcrumb(props) {
    const crumb = props;
    return (
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h4>{crumb.type}</h4>
                            <div class="breadcrumb__links">
                                <Helmet>
                                    <title>{crumb.type}</title>
                                </Helmet>
                                <Link to="/" style={{ color: 'black' }}>Home</Link>
                                <span>{crumb.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Breadcrumb