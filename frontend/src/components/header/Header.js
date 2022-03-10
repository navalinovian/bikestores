import React from 'react'
import { Link } from 'react-router-dom';

const Header = (data) => {
    return (
        <div>
            <div>
                {/* <!-- Navigation--> */}
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top" id="navbar">
                    <div className="container px-5">
                        <a className="navbar-brand" href="#page-top">Start Bootstrap</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                                </li>
                                {data.data?.staffdata ?
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {data.data.user.first_name}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" >Action</a></li>
                                            <li><a className="dropdown-item" >Another action</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" >Something else here</a></li>
                                        </ul>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/login'>Log In</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header